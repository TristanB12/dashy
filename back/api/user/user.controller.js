const jwt = require('../../services/jwt');

const getUserInfos = async (req, res) => {
    token = jwt.getTokenFromRequest(req);
    user = await jwt.getUserFromToken(token);

    if (!user)
        return res.status(400).json({message: 'Token match no user.'});
    return res.status(200).json(user);
}

const getUserWidgets = async (req, res) => {
    token = jwt.getTokenFromRequest(req);
    user = await jwt.getUserFromToken(token);

    if (!user)
        return res.status(400).json({message: 'Token match no user.'});
    return res.status(200).json(user.widgets);
}

module.exports = {
    getUserInfos,
    getUserWidgets
}