const axios = require ('axios');
const qs = require('qs');
require('dotenv').config(); 

const GithubClientId = process.env.GITHUB_CLIENT_ID 
const GithubClientSecret = process.env.GITHUB_CLIENT_SECRET

const getAccessToken = async (code) => {
    let url = 'https://github.com/login/oauth/access_token'
    let config = {
        headers: {
            'accept': 'application/json'
        }
    }
    let data = {
        client_id: GithubClientId,
        client_secret: GithubClientSecret,
        code: code
    }
    try {
        let res = await axios.post(url, qs.stringify(data), config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const getUserEmail = async (accesstoken) => {
    let url = 'https://api.github.com/user/emails'
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accesstoken
        }
    }
    try {
        let res = await axios.get(url, config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

module.exports = {
    getAccessToken,
    getUserEmail
}