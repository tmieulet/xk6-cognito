/*
 * Creator: @neuralegion/cypress-har-generator 0.0.0
 * https://github.com/NeuraLegion/cypress-har-generator#readme
 */

import { sleep } from 'k6';
import http from 'k6/http';

export default function main(arg) {
  const token = arg.AccessToken;
  let response;

  response = http.get(
    'https://exToChangeIdGateway.execute-api.eu-west-1.amazonaws.com/dev/example',
    {
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: token,
   
      },
    },
  );

  // Automatically added sleep
  sleep(1);
}
