const jwt = require('../services/jwt');

const authMiddleware = (req, res, next) => {
    let token = jwt.getTokenFromRequest(req);

    if (token == null)
        return res.status(401).json({message: "No token founded."});
    if (!jwt.isTokenValid(token))
        return res.status(401).json({message: "Wrong token."});
    next();
}

module.exports = {
    authMiddleware
}