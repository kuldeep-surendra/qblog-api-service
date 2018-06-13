const Hapi = require('hapi');
const jwt = require('hapi-auth-jwt2');
const jwksRsa = require('jwks-rsa');
const logger = require('debug')('hapi');

const routes = require('./config/routes');


const validate = async (decoded, request, callback) => { 
  logger('Validating user:', decoded);

  if (decoded && decoded.sub) {
    return callback(null, true);
  }

  return callback(null, false);
}
const init = async () => { 
  
  const server =  new Hapi.Server({ debug: { log: [ 'error' ] } });
   server.connection({
    host: "0.0.0.0",
    port: 3001
  });

  server.register(jwt, (err) => {
    if (err) {
      console.error('Failed to load a plugin:', err);
    }

    server.auth.strategy('jwt', 'jwt', { 
      key: jwksRsa.hapiJwt2Key({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://qwinixtest.auth0.com/.well-known/jwks.json'
      }),
      verifyOptions: { 
        audience: 'http://localhost:3001/',
        issuer: "https://qwinixtest.auth0.com/",
        algorithms: ['RS256']
      },
      validateFunc: validate
    });
  
    server.auth.default('jwt');
    server.route(routes);
  })
  server.start();
  console.log(`Server running at: ${server.info.uri}`);
}
init();

