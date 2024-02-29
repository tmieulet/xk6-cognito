/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-object-spread */
// spread does not work https://github.com/grafana/k6/issues/824

import { check, fail } from 'k6';

import cognito from 'k6/x/cognito';

import { SharedArray } from 'k6/data';
import { vu } from 'k6/execution';

const data = new SharedArray('users', (() => JSON.parse(open('users.json'))));


export function auth() {

  let client = cognito.connect('us-east-1');
  if (data.length === 0) {
    // GoError & fail() do not increment a metric iteration_failed
    // workaround : add a dummy check
    const message = '[auth] users.json is empty';
    check(data, {
      [message]: () => false,
    });
    fail(message);
  }

  // Initialize the connection

  // If connection were not sucessful, the return value is null
  // It's a good practice to add a check and configure a threshold (so, you can fail-fast if
  // configuration is incorrect)
  if (
    !check(client, {
      '[cognito] successful connection': (obj) => obj,
    })
  ) {
    fail('[cognito] connection failed');
  }

  const id = vu.idInTest % data.length;
  const { username, password } = data[id];

  console.log('user: ', username);

  try {
    console.log("Inside try")
    const tokens = client.auth(
      username,
      password,
      'us-east-1_BldPFSeIR',
      '741d3jutv63v9b0p62cjv1r3kl',
      { clientMetadata: { test: 'ok' } },
    );
    console.log(tokens)
    // spread does not work https://github.com/grafana/k6/issues/824
    return Object.assign({}, { username }, tokens);
  } catch (e) {
    // can generate  GoError: operation error Cognito Identity Provider: RespondToAuthChallenge
    //
    // GoError & fail() do not increment a metric iteration_failed
    // workaround : add a dummy check
    const message = `[cognito] successful auth ${username}`;
    check(e, {
      [message]: () => false,
    });
    throw e;
  }
}
