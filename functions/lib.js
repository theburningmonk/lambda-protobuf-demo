'use strict';

const Chance = require('chance');
const chance = new Chance();

function newPlayer() {
  let scores = [];
  for (var i = 0; i < 10; i++) {
    let newScore = chance.integer({ min: 0, max: 100 });
    scores.push(newScore);
  }

  return {
    id: chance.hash(),
    name: chance.name(),
    scores
  };
}

function genPlayers() {
  let players = [];
  for (var i = 0; i < 10; i++) {
    players.push(newPlayer());
  }

  return { players };
};

module.exports = {
  genPlayers
};