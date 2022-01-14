module.exports = [
    {
        code: 'TOC',
        name: 'Online channels',
        service: 'Twitch',
        refreshRate: 60,
        config: {
            numberOfChannels: {
                title: 'Number of channels',
                value: 5
            },
            displayImage: {
                title: 'Display image',
                value: true
            },
            displayViewerCount: {
                title: 'Display viewer count',
                value: true
            },
            displayGame: {
                title: 'Display game',
                value: true
            }
        }
    },
    {
        code: 'TUP',
        name: 'User profile',
        service: 'Twitch',
        refreshRate: 60,
        config: {
            username: {
                title: 'Username',
                value: 'default'
            },
            displayViewCount: {
                title: 'Display view count',
                value: true
            },
            displayDescription: {
                title: 'Display description',
                value: true
            },
            displayCreationDate: {
                title: 'Display creation date',
                value: true
            }
        }
    }
]