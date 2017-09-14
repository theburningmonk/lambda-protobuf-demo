'use strict';

const lib = require('./lib');

module.exports.handler = (event, context, callback) => {
  let players = lib.genPlayers();

  const response = {
    statusCode: 200,
    body: JSON.stringify(players)
  };

  callback(null, response);
};