const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const privateKey = process.env.JWT_PRIVATE_KEY;

const createToken = (userId) => {
    const oneWeek = 60 * 60 * 24 * 7;

    return jwt.sign(
        {userId: userId},
        privateKey,
        {expiresIn: oneWeek}
    );
}

const isTokenValid = (token) => {
    try {
      jwt.verify(token, privateKey);

      return true;
    } catch(err) {
      return false;
    }
}

const getTokenFromRequest = (req) => {
  const authHeader = req.headers['authorization'];

  return authHeader && authHeader.split(' ')[1];
}

const getUserFromToken = async (token) => {
  try {
    let decoded = jwt.verify(token, privateKey);
    return await User.findById(decoded.userId);
  } catch(err) {
    return null;
  }
}

module.exports = {
    createToken,
    isTokenValid,
    getTokenFromRequest,
    getUserFromToken
}