const postsController = require('../controllers/postsController')
const corsHeader = {
  origin: ['*'],
  headers: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'AuthKey', 'Authorization', 'Email'],
  credentials: true
};

const welcomeRoute = [{
  method: 'GET',
    path: '/posts',
    config: {
      auth: 'jwt',
      cors: corsHeader,
      handler: postsController.index
    }
}];

module.exports = [].concat(welcomeRoute);
