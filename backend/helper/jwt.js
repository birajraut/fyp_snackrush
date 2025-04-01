const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const generateAccessToken = (payload)=>{
   return jwt.sign({
        payload,
      }, process.env.JWT_SECRET, { expiresIn:process.env.JWT_ACCESS_EXPIRE });
}
const generateRefreshToken = (payload)=>{
   return jwt.sign({
        payload,
      }, process.env.JWT_SECRET, { expiresIn:process.env.JWT_REFRESH_EXPIRE });
}


// const jwtValidate = (token)=>{
//   console.log('toke', token)
//   const accessToken = token.split(' ')?.[1]
//   jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       console.log('jwt err', err)
//       throw new Error('token not valid')
//     }
//     return  decoded.id;
//   });

// }


const jwtValidate = async (token) => {
  try {
    const accessToken = token.split(' ')?.[1] || token;
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          // reject(new Error('Token not valid'));
          throw new Error('Token not valid')
        } else {
          resolve(decoded);
        }
      });
    });
    return decoded.payload.id;
    
  } catch (error) {
    throw error; 
  }
}


module.exports = {generateAccessToken,generateRefreshToken, jwtValidate}