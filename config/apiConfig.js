const ROOT_URL = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null ;
} 

module.exports = ROOT_URL();