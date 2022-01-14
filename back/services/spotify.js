const axios = require('axios');
const qs = require('qs');
const {Base64} = require('js-base64');
require('dotenv').config();

const availableWidgets = require('./spotify.widgets');

const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const clientId = process.env.SPOTIFY_CLIENT_ID;

const authBaseUrl = 'https://accounts.spotify.com';
const BaseUrl = 'https://api.spotify.com/v1';

const basicAuthHeaderString = `Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`;

const refreshAccessToken = async (refreshToken) => {
    const url = authBaseUrl + '/api/token';
    let config = {
        headers: {
            Authorization: basicAuthHeaderString,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    let data = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
    }
    try {
        let res = await axios.post(url, qs.stringify(data), config);
        return res.data.access_token;
    } catch (err) {
        return null;
    }
}

const getApiTokens = async (code) => {
    let url = authBaseUrl + '/api/token';
    let config = {
        headers: {
            Authorization: basicAuthHeaderString,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    let data = {
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI
    }
    try {
        let res = await axios.post(url, qs.stringify(data), config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

module.exports = {
    getApiTokens,
    availableWidgets,
    refreshAccessToken,
    authBaseUrl,
    BaseUrl,
}