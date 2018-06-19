const ROOT_URL = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : 'http://qblog.qwinix.net:3002' ;
} 

module.exports = ROOT_URL();