const axios = require('axios');

exports.index = (req, res) => {
  axios({method: 'get', url: 'http://localhost:3002/posts'}).then((response) => {
    res(response.data.posts);
  })
  .catch((err) => {
    console.log("err", err);
  })
}