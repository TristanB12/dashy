const axios = require ('axios');
require('dotenv').config(); 

const fbClientId = process.env.FACEBOOK_CLIENT_ID 
const fbClientSecret = process.env.FACEBOOK_CLIENT_SECRET
const fbRedirectUri = process.env.FACEBOOK_REDIRECT_URI

const getAccessToken = async (code) => {
    let url = 'https://graph.facebook.com/v12.0/oauth/access_token'
    let data = {
        client_id: fbClientId,
        redirect_uri: fbRedirectUri,
        client_secret: fbClientSecret,
        code: code,
        scope: 'email'
    }
    try {
        let res = await axios.get(url, {params: data});
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const getUserInfos = async (accesstoken) => {
    let url = 'https://graph.facebook.com/me'
    let data = {
        fields: 'email,picture',
        access_token: accesstoken
    }
    try {
        let res = await axios.get(url, {params: data});
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

module.exports = {
    getAccessToken,
    getUserInfos
}