import { sleep } from 'k6';

import { describe } from 'https://jslib.k6.io/expect/0.0.5/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

import { auth } from './auth-cognito.js';

import Test from './generatedTest.js'; 

const testName = `Exemple-${(new Date()).toISOString()}`;


let authData;
export default function main() {
  // if the test fails, k6 restarts it directly => workaround : sleep
  sleep(1);
 // if (authData) {
  //  console.log('reusing auth');
  //} else {
    authData = auth();
  //}

  // export default function main(arg) {
  // const token = arg.AccessToken;
  /*describe(`1. scenario 1 as ${authData.username}`, () => {
    Test(authData);
  });
  describe(`2. scenario 2 as ${authData.username}`, () => {
    //
    Test(authData);
  });*/
}


/*export function handleSummary(data) {
  return {
    [`/scripts/target/result-${testName}.html`]: htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}*/

// See https://k6.io/docs/using-k6/options
export const options = {
  stages: [
    { duration: '1m', target: 1 },
    //{ duration: '3m', target: 20 },
    //{ duration: '1m', target: 0 },
  ],
  thresholds: {
    // add some minimal thresholds otherwise
    //  echo $?  is 0
    http_req_failed: ['rate<0.02'], // http errors should be less than 2%
    http_req_duration: ['p(95)<2000'], // 95% requests should be below 2s
    checks: [
    // https://k6.io/docs/javascript-api/k6-metrics/rate/
    // more than 10% of errors will abort the test
      { threshold: 'rate > 0.9', abortOnFail: true }],

  },
  // ext: {
  //   loadimpact: {
  //     distribution: {
  //       'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 },
  //     },
  //   },
  // },
};

