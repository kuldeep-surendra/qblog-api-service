const welcomeRoute = [{
  method: "GET",
  path: "/",
  config: { auth: 'jwt' },
  handler: (req, reply) => {
    reply("hello !!!!");
  }
}];

module.exports = [].concat(welcomeRoute);
