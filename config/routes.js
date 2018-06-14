const postsController = require('../handlers/postsHandler')

const welcomeRoute = [{
  method: "GET",
  path: "/",
  // config: { auth: 'jwt' },
  handler: (req, reply) => {
    reply("hello !!!!");
  }
}];

const postsRoutes = [
  {
    method: 'GET',
    path: '/posts',
    handler: postsController.index
  },
  {
    method: 'POST',
    path: '/posts',
    handler: postsController.create
  },
  {
    method: 'GET',
    path: '/posts/{id}',
    handler: postsController.show
  },
  {
    method: 'DELETE',
    path: '/posts/{id}',
    handler: postsController.delete
  },
  {
    method: 'PUT',
    path: '/posts/{id}',
    handler: postsController.update
  }
];

module.exports = [].concat(welcomeRoute, postsRoutes);
