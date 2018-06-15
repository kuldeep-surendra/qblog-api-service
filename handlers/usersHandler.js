const axios = require('axios');
const ROOT_URL = require('../config/apiConfig');
var usersHandler = {};

usersHandler.createUser = (req, reply) => {
  console.log("hi")
  axios({
    method: 'post', 
    url: `${ROOT_URL}/users`, 
    headers: req.headers, 
    data: req.payload
  })
  .then((apiResponse) => reply.response(apiResponse.data).code(apiResponse.status))
  .catch(error => reply.response(error.message).code(503));
};

module.exports = usersHandler;