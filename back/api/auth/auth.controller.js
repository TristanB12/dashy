const User = require('../../models/User');
const jwt = require('../../services/jwt');
const authService = require('./auth.service');
const facebook = require('../../services/facebook');
const github = require('../../services/github');
const axios = require('axios');
const { get } = require('mongoose');

const verify = (req, res) => {
    if (jwt.isTokenValid(req.query.token))
        return res.status(200).json({message: "Token is valid."});
    return res.status(400).json({message: 'Token is not valid.'});
}

const login = async (req, res) => {
    if (!req.body.password || !req.body.email)
        return res.status(400).json({message: "You should provide email and password."});

    const filter = {
        'auth.email': req.body.email
    }
    let user = await User.findOne(filter);

    if (!user)
        return res.status(400).json({message: "Email adress is not correct."});
    if (user.auth.auth_type != 'email')
        return res.status(400).json({message: `Email adress is assigned with a ${user.auth.auth_type} account.`});
    if (!await authService.isPasswordValid(req.body.password, user.auth.password))
        return res.status(400).json({message: "Password is not correct."});
    return res.status(200).json({
        access_token: jwt.createToken(user._id),
        type: 'Bearer'
    })
}

const loginWithGithub = async (req, res) => {
    let accessToken = await github.getAccessToken(req.body.code);
    if (!accessToken[0])
        return res.status(400).json({message: "Invalid authorization code"})
    let userEmail = await github.getUserEmail(accessToken[0].access_token);
    if (!userEmail[0])
        return res.status(400).json({message: "Cannot get user email"})

    const filter = {
        'auth.email': userEmail[0][0].email
    }
    let user = await User.findOne(filter);

    if (!user)
        return res.status(400).json({message: "Email adress is not correct."});
    if (user.auth.auth_type != 'github')
        return res.status(400).json({message: `Email adress is assigned with a ${user.auth.auth_type} account.`});
    return res.status(200).json({
        access_token: jwt.createToken(user._id),
        type: 'Bearer'
    })
}

const loginWithFacebook = async (req, res) => {
    let accessToken = await facebook.getAccessToken(req.body.code);
    if (!accessToken[0])
        return res.status(400).json({message: "Invalid authorization code"})
    let userInfos = await facebook.getUserInfos(accessToken[0].access_token);
    if (!userInfos[0])
        return res.status(400).json({message: "Cannot get user infos"})

    const filter = {
        'auth.email': userInfos[0].email
    }
    let user = await User.findOne(filter);

    if (!user)
        return res.status(400).json({message: "Email adress is not correct."});
    return res.status(200).json({
        access_token: jwt.createToken(user._id),
        type: 'Bearer'
    })
}

const signup = async (req, res) => {
    let passwordMessage = undefined;

    if (!req.body.password || !req.body.email)
        return res.status(400).json({message: "You should provide email and password."});
    if (passwordMessage = authService.checkCredentials(req.body))
        return res.status(400).json({message: passwordMessage});
    const hash = authService.encryptPassword(req.body.password);
    const user = new User({
        auth: {
            auth_type: 'email',
            email: req.body.email,
            password: hash
        }
    })
    try {
        let userCreated =  await user.save();

        return res.status(200).json({
            access_token: jwt.createToken(userCreated._id),
            type: 'Bearer'
        })
    } catch {
        return res.status(400).json({message: 'Email already taken.'});
    }
}

const signupWithGithub = async (req, res) => {
    let accessToken = await github.getAccessToken(req.body.code);
    
    if (!accessToken[0])
        return res.status(400).json({message: "Invalid authorization code"})

    let userEmail = await github.getUserEmail(accessToken[0].access_token);
    if (!userEmail[0])
        return res.status(400).json({message: "Cannot get user email"})

    const user = new User({
        auth: {
            auth_type: 'github',
            email: userEmail[0][0].email,
        }
    })
    try {
        let userCreated =  await user.save();

        return res.status(200).json({
            access_token: jwt.createToken(userCreated._id),
            type: 'Bearer'
        })
    } catch {
        return res.status(400).json({message: 'Email already taken.'});
    }
}

const signupWithFacebook = async (req, res) => {
    let accessToken = await facebook.getAccessToken(req.body.code);
    if (!accessToken[0])
        return res.status(400).json({message: "Invalid authorization code"})
    let userInfos = await facebook.getUserInfos(accessToken[0].access_token);
    if (!userInfos[0])
        return res.status(400).json({message: "Cannot get user infos"})

    const user = new User({
        auth: {
            auth_type: 'facebook',
            email: userInfos[0].email,
        }
    })
    try {
        let userCreated =  await user.save();

        return res.status(200).json({
            access_token: jwt.createToken(userCreated._id),
            type: 'Bearer'
        })
    } catch {
        return res.status(400).json({message: 'Email already taken.'});
    }
}

module.exports = {
    verify,
    login,
    loginWithFacebook,
    loginWithGithub,
    signup,
    signupWithFacebook,
    signupWithGithub
}