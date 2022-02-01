/*
 * Creator: @neuralegion/cypress-har-generator 0.0.0
 * https://github.com/NeuraLegion/cypress-har-generator#readme
 */

import { check, sleep } from 'k6';
import http from 'k6/http';


import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

import {auth} from './auth-cognito.js'

const testName = `Example-${(new Date()).toISOString()}`;

export function handleSummary(data) {
  return {
    [`/scripts/target/result-${testName}.html`]: htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

// See https://k6.io/docs/using-k6/options
export const options = {
  insecureSkipTLSVerify: true,
  stages: [
    { duration: '1m', target: 5 },
    { duration: '3m', target: 20 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'], // http errors should be less than 2%
    http_req_duration: ['p(95)<2000'], // 95% requests should be below 2s
  },
  // ext: {
  //   loadimpact: {
  //     distribution: {
  //       'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 },
  //     },
  //   },
  // },
};



export default function main() {
  


  const res = auth();

  // console.log('res', JSON.stringify(res));

  let response;

  response = http.get(
    'https://exToChangeIdGateway.execute-api.eu-west-1.amazonaws.com/dev/example',
    {
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: res.AccessToken,
   
      },
    },
  );

  // Automatically added sleep
  sleep(1);
}
