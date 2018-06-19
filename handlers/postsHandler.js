const axios = require('axios');
const ROOT_URL = require('../config/apiConfig');
var postsHandler = {};

postsHandler.index = (req, reply) => {
  axios({
    method: 'get', 
    url: `${ROOT_URL}/posts`, 
    headers: req.headers
  })
  .then((apiResponse) => reply.response(apiResponse.data).code(apiResponse.status))
  .catch(e => console.log(e));
};

postsHandler.create = (req, reply) => {
  axios({
    method: 'post', 
    url: `${ROOT_URL}/posts`, 
    headers: req.headers, 
    data: req.payload
  })
  .then((apiResponse) => reply.response(apiResponse.data).code(apiResponse.status))
  .catch(error => reply.response(error.message).code(503));
};

postsHandler.show = (req, reply) => {
  axios({
    method: 'get', 
    url: `${ROOT_URL}/posts/${req.params.id}`, 
    headers: req.headers
  })
  .then((apiResponse) => reply.response(apiResponse.data).code(apiResponse.status))
  .catch(error => reply.response(error.message).code(503));
};

postsHandler.delete = (req, reply) => {

};

postsHandler.update = (req, reply) => {

};

module.exports = postsHandler;