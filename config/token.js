'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

function createToken(session) {
  console.log("create token", session.username)
  return jwt.sign({ id: session.id, username: session.username, userId: session.userId }, secret(), { algorithm: 'HS256', expiresIn: "1h" } );
}

module.exports = createToken;