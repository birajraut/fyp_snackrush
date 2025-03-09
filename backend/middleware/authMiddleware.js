const jwt = require('jsonwebtoken');
const {jwtValidate} = require('../helper/jwt')
const authMiddleware = async (req, res, next) => {
  const token =  req.headers['authorization'];

  if (!token) {
    return res.status(401).json({
      message:'unauthorized'
    });
  }
const decoded = await jwtValidate(token)
if(decoded){
  req.auth_user = decoded
  next()
}else{
  return res.status(401).json({
    message:'unauthorized-token not valid'
  });
}
 
};

module.exports = authMiddleware;
