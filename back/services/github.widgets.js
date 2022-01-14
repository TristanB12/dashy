module.exports = [
    {
        code: 'GUP',
        name: 'Github user profile',
        service: 'Github',
        refreshRate: 60,
        config: {
            displayLocation: {
                title: 'Display location',
                value: true
            },
            displayFollowersCount: {
                title: 'Display followers count',
                value: true
            },
            displayCreationDate: {
                title: 'Display creation date',
                value: true
            }
        }
    }
]