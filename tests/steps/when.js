'use strict';

const co      = require('co');
const Promise = require("bluebird");
const http    = require('superagent-promise')(require('superagent'), Promise);
const root    = process.env.TEST_ROOT;

let we_invoke_get_proto = co.wrap(function* () {
  let url = `${root}/proto`;

  let httpRes = yield http
    .get(url)
    .set('Accept', 'application/x-protobuf')
    .responseType('blob');

  return { 
    statusCode: httpRes.status,
    body: httpRes.body,
    headers: httpRes.headers
  };
});

module.exports = {
  we_invoke_get_proto
};