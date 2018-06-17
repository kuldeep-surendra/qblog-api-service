'use strict';
const axios = require('axios');
const ROOT_URL = require('../config/apiConfig');
const Bcrypt = require('bcryptjs');
const redis = require('redis');
const aguid = require('aguid');
const secret = require('../config/secret');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/configRedis.json')[env];
const client = redis.createClient(config);
require('bluebird').promisifyAll(redis.RedisClient.prototype);
const createToken = require('../config/token');

var usersHandler = {};

usersHandler.createUser = (req, reply) => {
  axios({
    method: 'post', 
    url: `${ROOT_URL}/users`, 
    headers: req.headers, 
    data: req.payload
  })
  .then((apiResponse) => reply.response(apiResponse.data).code(apiResponse.status))
  .catch(error => reply.response(error.message).code(503));
};

usersHandler.login = (req, reply) => {
  axios({
    method: 'get', 
    url: `${ROOT_URL}/getOneUser?email=${req.payload.email}`, 
    headers: req.headers
  })
  .then(async (res) => {
    const user = res.data.user;
    const isValid = await Bcrypt.compare(req.payload.password, user.password);
    if(isValid){
      const session = {
        valid: true, // this will be set to false when the person logs out
        id: aguid(), // a random session id
        username: user.username,
        userId: user.id,
        exp: new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes time
      }
      client.set(session.id, JSON.stringify(session));
      const token = await createToken(session)
      reply.response({ message: "Logged In Successfully", id_token: token, email: user.email, status: 200 });
    }else{
      reply.response({message: "Invalid email or password", status: 401});
    }
  })
  .catch((err) => {
    reply.response({ err, status: 401, message: "Invalid email or password" });
  });
};
module.exports = usersHandler;