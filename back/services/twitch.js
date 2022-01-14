const axios = require ('axios');
const qs = require('qs');
const { head } = require('../api/services/services.routes');
require('dotenv').config(); 

const twitchClientSecret = process.env.TWITCH_CLIENT_SECRET;
const twitchClientId = process.env.TWITCH_CLIENT_ID;
const twitchRedirectUri = process.env.TWITCH_REDIRECT_URI;

const getApiTokens = async (code) => {
    let url = 'https://id.twitch.tv/oauth2/token';

    let data = {
        client_id: twitchClientId,
        client_secret: twitchClientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: twitchRedirectUri
    }
    try {
        let res = await axios.post(url, qs.stringify(data));
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const refreshAccessToken = async (refreshToken) => {
    const url = 'https://id.twitch.tv/oauth2/token';
    
    let data = {
        client_id: twitchClientId,
        client_secret: twitchClientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        scope: 'user:read:follows'
    }
    try {
        let res = await axios.post(url, qs.stringify(data));
        return res.data.access_token;
    } catch (err) {
        return null;
    }
}

const getUserId = async (accesstoken) => {
    const url = 'https://api.twitch.tv/helix/users';

    let config = {
        headers: {
            'Authorization': 'Bearer ' + accesstoken,
            'client-ID': twitchClientId
        }
    }
    try {
        let res = await axios.get(url, config);
        return res.data.data[0].id;
    } catch (err) {
        return null;
    }
}

module.exports = {
    getApiTokens,
    refreshAccessToken,
    getUserId
}