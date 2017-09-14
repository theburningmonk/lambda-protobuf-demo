'use strict';

const co       = require('co');
const Promise  = require('bluebird');
const protobuf = Promise.promisifyAll(require("protobufjs"));
const lib      = require('./lib');
const fs       = require('fs');

const NotAcceptableResponse = {
  statusCode: 406
}

function jsonResponse(result) {
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
}

let protoResponse = co.wrap(function* (result, protoFilePath, messageType) {
  let root = yield protobuf.loadAsync(protoFilePath);
  let MsgType = root.lookupType(messageType);
  let message = MsgType.create(result);
  let buffer = MsgType.encode(message).finish();

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/x-protobuf' },
    body: buffer.toString('base64'),
    isBase64Encoded: true
  };
});

module.exports.handler = co.wrap(function* (event, context, callback) {
  console.log(JSON.stringify(event));

  let players = lib.genPlayers();

  let accept = event.headers.Accept || "application/json";
  switch (accept) {
    case "application/x-protobuf":
      let response = yield protoResponse(players, "functions/player.proto", "protodemo.Players");
      callback(null, response);
      break;
    case "application/json":
      callback(null, jsonResponse(players));
      break;
    default:    
      callback(null, NotAcceptableResponse);
  }
});