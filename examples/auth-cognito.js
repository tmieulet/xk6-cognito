
import { check } from 'k6';


import cognito from 'k6/x/cognito';

import { SharedArray } from 'k6/data';
import { vu } from 'k6/execution';

const data = new SharedArray('users', (() => JSON.parse(open('users.json'))));

const client = cognito.connect('eu-west-1');

export function auth() {


  if (data.length === 0) {
    fail('[auth] users.json is empty');
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

  // can generate  GoError: operation error Cognito Identity Provider: RespondToAuthChallenge
  return client.auth(
    username,
    password,
    'eu-west-1_exToChangePoolId',
    'exToChangeClientId',
    { clientMetadata: { test: 'ok' } },
  );
}
