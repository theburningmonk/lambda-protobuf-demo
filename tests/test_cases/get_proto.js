'use strict';

const co       = require('co');
const Promise  = require('bluebird');
const expect   = require('chai').expect;
const when     = require('../steps/when');
const protobuf = Promise.promisifyAll(require("protobufjs"));

let decode = co.wrap(function* (payload) {
  let root = yield protobuf.loadAsync("functions/player.proto");
  let Players = root.lookupType("protodemo.Players");
  return Players.decode(payload);
});

describe('When we hit the GET /proto endpoint', () => {
  it('Should return 10 players in protobuf', co.wrap(function* () {
    let httpResp = yield when.we_invoke_get_proto();

    expect(httpResp.statusCode).to.equal(200);

    let body = yield decode(httpResp.body);
    console.log(body);

    expect(body.players).to.have.lengthOf(10);
    body.players.forEach(p => {
      expect(p).to.have.property("name");
      expect(p).to.have.property("id");
      expect(p).to.have.property("scores");

      expect(p.scores).to.have.lengthOf(10);
    });
  }));
});