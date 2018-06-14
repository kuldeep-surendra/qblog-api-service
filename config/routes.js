
const corsHeader = {
  origin: ['*'],
  headers: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'AuthKey', 'Authorization', 'Email'],
  credentials: true
};

const welcomeRoute = [{
  method: 'GET',
    path: '/api/private',
    config: {
      auth: 'jwt',
      cors: corsHeader,
      handler: (req, res) => {
        res({
          message: 'Hello from a private endpoint! You need to be authenticated to see this.'
        });
      }
    }
}];

module.exports = [].concat(welcomeRoute);
