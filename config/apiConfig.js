const ROOT_URL = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : null ;
} 

module.exports = ROOT_URL();