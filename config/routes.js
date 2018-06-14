const welcomeRoute = [{
  // method: "GET",
  // path: "/api/private",
  // config: { auth: 'jwt', cors: true},
  // handler: (req, res) => {
  //   res({
  //         message: "Hello from a public endpoint! You don't need to be authenticated to see this."
  //       });
  // }




  method: 'GET',
      path: '/api/private',
      config: {
        auth: 'jwt',
        cors: true,
        handler: (req, res) => {
          console.log(res)
          res({
            message: "Hello from a public endpoint! You don't need to be authenticated to see this."
          });
        }
      }
}];

module.exports = [].concat(welcomeRoute);
