const User = require('../../models/User');
const servicesService = require('./services.service');
const jwt = require('../../services/jwt');
const spotifyApi = require('../../services/spotify');
const twitchApi = require('../../services/twitch');
const githubApi = require('../../services/github');

const linkGithub = async (req, res) => {
    let response = await githubApi.getAccessToken(req.body.code);
    let userToken = jwt.getTokenFromRequest(req);

    if (!response[0])
        return res.status(400).json(response[1]);
    let user = await jwt.getUserFromToken(userToken);
    if (!user)
        return res.status(401).json({message: "The token is assigned to no user."});
    user.services.github = {
        access_token: response[0].access_token,
        refresh_token: response[0].access_token
    }
    await User.findByIdAndUpdate({_id: user._id}, {services: user.services});
    res.status(200).json({message: "Github account linked."});
}

const linkTwitch = async (req, res) => {
    let response = await twitchApi.getApiTokens(req.body.code);
    let userToken = jwt.getTokenFromRequest(req);

    if (!response[0])
        return res.status(400).json(response[1]);
    let user = await jwt.getUserFromToken(userToken);
    if (!user)
        return res.status(401).json({message: "The token is assigned to no user."});
    user.services.twitch = {
            access_token: response[0].access_token,
            refresh_token: response[0].refresh_token
    }
    await User.findByIdAndUpdate({_id: user._id}, {services: user.services});
    res.status(200).json({message: "Twitch account linked."});
}

const linkSpotify = async (req, res) => {
    let response = await spotifyApi.getApiTokens(req.body.code);
    let userToken = jwt.getTokenFromRequest(req);

    if (!response[0])
        return res.status(400).json(response[1]);
    let user = await jwt.getUserFromToken(userToken);
    if (!user)
        return res.status(401).json({message: "The token is assigned to no user."});
    user.services.spotify = {
        access_token: response[0].access_token,
        refresh_token: response[0].refresh_token
    }
    await User.findByIdAndUpdate({_id: user._id}, {services: user.services});
    res.status(200).json({message: "Spotify account linked."});
}

const availableWidgets = (req, res) => {
    res.status(200).json({widgets: spotifyApi.availableWidgets});
}

const getWidgetContent = async (req, res) => {
    let userToken = jwt.getTokenFromRequest(req);
    let user = await jwt.getUserFromToken(userToken);

    if (!user)
        return res.status(401).json({message: "The token is assigned to no user."});
    if (!req.body.config)
        return res.status(400).json({message: 'No config founded.'});
    let content = await servicesService.getWidgetContent(req.params.code, req.body.config, user.services);
    if (!content)
        return res.status(500).json({message: 'Internal server error.'});
    return res.status(200).json({content: content});
}

module.exports = {
    linkSpotify,
    linkTwitch,
    linkGithub,
    availableWidgets,
    getWidgetContent,
}