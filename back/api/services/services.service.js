const spotifyApi = require('../../services/spotify');
const twitchApi = require('../../services/twitch');
const githubApi = require('../../services/github');
const axios = require('axios');
const { push } = require('../../services/spotify.widgets');
const { response } = require('express');

const nkaFunc = async (config) => {
    const fetch = async (config) => {
        const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        let params = {
            q: config.keyword.value,
            'api-key': process.env.NYT_API_KEY
        }
        try {
            let res = await axios.get(url, {params: params});
            return res.data;
        } catch (err) {
            return null;
        }
    }
    let res = await fetch(config);
    if (!res)
        return null;
    res.response.docs.forEach(item => {
        if (!config.displayLeadParagraph.value)
            delete item.lead_paragraph;
        if (!config.displaySource.value)
            delete item.source;
    });
    return res;
}

const fwpFunc = async (config) => {
    const fetch = async () => {
        const url = 'https://api.fbi.gov/wanted/v1/list'
        let params = {
            'page': Math.floor(Math.random() * 48) + 1
        }
        try {
            let res = await axios.get(url, {params: params});
            return res.data;
        } catch (err) {
            return null;
        }
    }
    let res = await fetch(config);
    if (!res)
        return null;
    let newRes = [];
    res.items.forEach(e => {
        if (!config.reward.value) {
            newRes.push(e)
        } else if (e.reward_text)
            newRes.push(e)
    });
    newRes.forEach(e => {
        if (!config.displayImages.value)
            delete e.images;
        if (!config.displaySubjects.value)
            delete e.subjects;
        if (!config.displayFiles.value)
            delete e.files;
    });
    return newRes;
}

const gupFunc = async (config, tokens) => {
    const fetch = async (config, accessToken) => {
        const url = 'https://api.github.com/user';
        let headers =  {
            Authorization: 'Bearer ' + accessToken,
            'accept': 'application/vnd.github.v3+json'
        }
        try {
            let res = await axios.get(url, {headers: headers});
            return res.data;
        } catch (err) {
            return null;
        }
    }
    let res = await fetch(config, tokens.github.access_token);
    if (!res)
        return null;
    if (!config.displayLocation.value)
        delete res.location;
    if (!config.displayFollowersCount.value)
        delete res.followers;
    if (!config.displayCreationDate.value) {
        delete res.created_at;
    }
    return res;
} 

const tupFunc = async (config, tokens) => {
    const fetch = async (config, accessToken) => {
        const url = 'https://api.twitch.tv/helix/users';
        let headers =  {
            Authorization: 'Bearer ' + accessToken,
            'Client-Id': process.env.TWITCH_CLIENT_ID
        }
        let params = {
            login: config.username.value
        }
        try {
            let res = await axios.get(url, {params: params, headers: headers});
            return res.data;
        } catch (err) {
            return null;
        }
    }
    let res = await fetch(config, tokens.twitch.access_token);
    if (!res)
        res = await fetch(config, await twitchApi.refreshAccessToken(tokens.twitch.refresh_token));
    if (!res)
        return null;
    res.data.forEach(item => {
        if (!config.displayViewCount.value)
            delete item.view_count;
        if (!config.displayDescription.value)
            delete item.description;
        if (!config.displayCreationDate.value)
            delete item.created_at;
    });
    return res.data;
} 

const tocFunc = async (config, tokens) => {
    const fetch = async (config, accessToken) => {
        let params = {
            user_id: await twitchApi.getUserId(accessToken),
            first: config.numberOfChannels.value
        }
        let requestConfig = {
            method: 'get',
            url: 'https://api.twitch.tv/helix/streams/followed',
            headers: { 
                'Client-id': process.env.TWITCH_CLIENT_ID, 
                'Authorization': 'Bearer ' + accessToken
            },
            params: params
        };
        try {
            let res = await axios(requestConfig);
            return res.data;
        } catch (err) {
            return null;
        }
    }
    let res = await fetch(config, tokens.twitch.access_token);
    if (!res)
        res = await fetch(config, await twitchApi.refreshAccessToken(tokens.twitch.refresh_token));

    if (!res)
        return null;
    res.data.forEach(item => {
        if (!config.displayImage.value)
            delete item.thumbnail_url;
        if (!config.displayViewerCount.value)
            delete item.viewer_count;
        if (!config.displayGame.value)
            delete item.game_name;
    });
    return res.data;
} 

const staFunc = async (config, tokens) => {
    const fetch = async (config, accessToken) => {
        const url = spotifyApi.BaseUrl + '/me/top/artists';
        let headers =  {
                Authorization: 'Bearer ' + accessToken,
            }
        let params = {
            limit: config.numberOfArtists.value,
            time_range: 'long_term'
        }
        try {
            let res = await axios.get(url, {params: params, headers: headers});
            return res.data;
        } catch (err) {
            return null;
        }
    }
    let res = await fetch(config, tokens.spotify.access_tokens);
    if (!res)
        res = await fetch(config, await spotifyApi.refreshAccessToken(tokens.spotify.refresh_token));
    if (!res)
        return null;
    res.items.forEach(item => {
        if (!config.displayArtistName.value)
            delete item.name;
        if (!config.displayImage.value)
            delete item.images;
        if (!config.displayGenre.value)
            delete item.genres;
        if (!config.displaynumberOfFollowers.value)
            delete item.followers;
    });
    return res.items;
}

const sttFunc = async (config, tokens) => {
    const fetch = async (config, accessToken) => {
        const url = spotifyApi.BaseUrl + '/me/top/tracks';
        let headers =  {
                Authorization: 'Bearer ' + accessToken,
            }
        let params = {
            limit: config.numberOfTracks.value,
            time_range: 'long_term'
        }
        try {
            let res = await axios.get(url, {params: params, headers: headers});
            return res.data;
        } catch (err) {
            return null;
        }
    }
    let res = await fetch(config, tokens.spotify.access_tokens);
    if (!res)
        res = await fetch(config, await spotifyApi.refreshAccessToken(tokens.spotify.refresh_token));
    if (!res)
        return null;
    res.items.forEach(item => {
        if (!config.displayAlbum.value)
            delete item.album;
        if (!config.displayArtistName.value)
            delete item.artists;
    });
    return res.items;
}

const func_array = [
    {code: 'STA', func: staFunc},
    {code: 'STT', func: sttFunc},
    {code: 'TOC', func: tocFunc},
    {code: 'TUP', func: tupFunc},
    {code: 'GUP', func: gupFunc},
    {code: 'FWP', func: fwpFunc},
    {code: 'NKA', func: nkaFunc}
]

const getWidgetContent = async (widgetCode, config, tokens) => {
    let res = undefined;

    func_array.forEach(function (e) {
        if (widgetCode == e.code) {
            res = e.func(config, tokens);
        }
    });
    return res;
}

module.exports = {
    getWidgetContent
}