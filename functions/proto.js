'use strict';

const co       = require('co');
const Promise  = require('bluebird');
// const protobuf = Promise.promisifyAll(require("protobufjs"));
const lib      = require('./lib');
const fs       = require('fs');

module.exports.handler = co.wrap(function* (event, context, callback) {
  let players = lib.genPlayers();
  // let root = yield protobuf.loadAsync("functions/player.proto");
  // let Players = root.lookupType("protodemo.Players");
  // let message = Players.create(players);
  // let buffer = Players.encode(message).finish();

  // let fd = fs.openSync("functions/players", "w");
  // fs.writeSync(fd, buffer, 0, buffer.length, 0);

  let buffer = fs.readFileSync("functions/players");

  const response = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/x-protobuf'},
    body: buffer.toString('base64'),
    isBase64Encoded: true
  };

  callback(null, response);
});