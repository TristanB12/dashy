const spotifyWidgets = require('./spotify.widgets');
const twitchWidgets = require('./twitch.widgets');
const githubWidgets = require('./github.widgets');
const fbiWidgets = require('./fbi.widgets');

const services = [
    {
        service: 'dashy',
        widgets: fbiWidgets
    },
    {
        service: 'spotify',
        widgets: spotifyWidgets
    },
    {
        service: 'twitch',
        widgets: twitchWidgets
    },
    {
        service: 'github',
        widgets: githubWidgets
    },
];

const getAllDefaultWidgets = () => {
    return services;
}

const isValidWidgetCode = (code) => {
    let isValid = false;

    services.forEach(service => {
        service.widgets.forEach(widget => {
            if (widget.code == code) {
                isValid = true;
            }
        })
    })
    return isValid;
}

module.exports = {
    getAllDefaultWidgets,
    isValidWidgetCode
}