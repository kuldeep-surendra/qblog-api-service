const postsController = require('../handlers/postsHandler')
const usersController = require('../handlers/usersHandler')
const Joi = require('joi');

const welcomeRoute = [{
  method: "GET",
  path: "/",
  // config: { auth: 'local' },
  handler: (req, reply) => {
    reply("hello !!!!");
  }
}];

const corsHeader = {
  origin: ['*'],
  headers: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'AuthKey', 'Authorization', 'Email'],
  credentials: true
};

const postsRoutes = [
  {
    method: 'GET',
    path: '/posts',
    config: {
      auth: {
        strategies: ['local', 'jwt']
      },
      cors: corsHeader,
      handler: postsController.index
    }
  },
  {
    method: 'POST',
    path: '/posts',
    config: {
      auth: {
        strategies: ['local', 'jwt']
      },
      cors: corsHeader,
      handler: postsController.create
    }
  },
  {
    method: 'GET',
    path: '/posts/{id}',
    config: {
      auth: {
        strategies: ['local', 'jwt']
      },
      cors: corsHeader,
      handler: postsController.show
    }
  },
  {
    method: 'DELETE',
    path: '/posts/{id}',
    config: {
      auth: {
        strategies: ['local', 'jwt']
      },
      cors: corsHeader,
      handler: postsController.delete
    }
  },
  {
    method: 'PUT',
    path: '/posts/{id}',
    config: {
      auth: {
        strategies: ['local', 'jwt']
      },
      cors: corsHeader,
      handler: postsController.update
    }
  }
];

const usersRoutes = [
  {
    method: "POST",
    path: "/users",
    config: {
      cors: corsHeader,
      auth: false,
      handler: usersController.createUser
    }
  },
  {
    method: "POST",
    path: "/login",
    config: {
      cors: corsHeader,
      auth: false
    },
    handler: usersController.login
  }
];
module.exports = [].concat(welcomeRoute, postsRoutes, usersRoutes);
