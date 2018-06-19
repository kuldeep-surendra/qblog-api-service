'use strict';

const Hapi = require('hapi');
const jwt = require('hapi-auth-jwt2');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();
const routes = require('./config/routes');
const axios = require('axios');
const server = new Hapi.Server();
const secret = require('./config/secret');
const redis = require('redis');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/configRedis.json')[env];
const client = redis.createClient(config);
require('bluebird').promisifyAll(redis.RedisClient.prototype);
const ROOT_URL = require('./config/apiConfig');

server.connection({
  port: process.env.PORT || 3001,
  routes: {
    cors: {
      // change this for production
      origin: ['http://localhost:3000']
    }
  }
});

client.set('redis', 'working');
client.get('redis', function (rediserror, reply) {
  if (rediserror) {
    console.log(rediserror);
  }
  console.log('redis is ' + reply.toString()); // confirm we can access redis
});

const validateLocalUser = async (decoded, request, callback) => {
  try {
    axios({
      method: 'get', 
      url: `${ROOT_URL}/getOneUser?email=${request.headers.email}`, 
      headers: request.headers, 
    })
    .then(async(res) => {
      const user = res.data.user;
      if(user){
        var isValid;
        await client.getAsync(decoded.id).then((reply) => {
          const session = JSON.parse(reply)
          if(session.valid === true){
            isValid = true;
          }else{
            isValid = false;
          }
        })
        .catch((err) => {
          return callback(null, err);
        })
        return callback(null, true)
      }else{
        return callback(null, false)
      }
    })
    .catch((err) => {
      return callback(null, err)
    })
  } catch (e) {
    return callback(null, err)
  }
};

const validateUser = (decoded, request, callback) => {
  // This is a simple check that the `sub` claim
  // exists in the access token. Modify it to suit
  // the needs of your application
  if (decoded && decoded.sub) {
    if (decoded.scope)
      return callback(null, true, {
        scope: decoded.scope.split(' ')
      });

    return callback(null, true);
  }

  return callback(null, false);
};

server.register(jwt, err => {
  if (err) throw err;
  server.auth.strategy('jwt', 'jwt', 'required', {
    complete: true,
    // verify the access token against the
    // remote Auth0 JWKS
    key: jwksRsa.hapiJwt2Key({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    verifyOptions: {
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256']
    },
    validateFunc: validateUser
  });

  server.auth.strategy('local', 'jwt', { 
    complete: true,
    key: secret(),
    validateFunc: validateLocalUser,
    verifyOptions: { algorithms: [ 'HS256' ], ignoreExpiration: true }
  });
  // registerRoutes();
  server.route(routes);
});

server.start(err => {
  if (err) throw err;
  console.info(`Server running at: ${server.info.uri}`);
});
