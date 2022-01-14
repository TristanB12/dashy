module.exports = [
    {
        code: 'STA',
        name: 'Top artists',
        service: 'Spotify',
        refreshRate: 60,
        config: {
            numberOfArtists: {
                title: 'Number of Artists',
                value: 5
            },
            displayImage: {
                title: 'Display image',
                value: true
            },
            displayArtistName: {
                title: 'Display artist name',
                value: true
            },
            displayGenre: {
                title: 'Display genre',
                value: true
            },
            displaynumberOfFollowers: {
                title: 'Display number of followers',
                value: true
            },
        }
    },
    {
        code: 'STT',
        name: 'Top tracks',
        service: 'Spotify',
        refreshRate: 60,
        config: {
            numberOfTracks: {
                title: 'Number of tracks',
                value: 5
            },
            displayAlbum: {
                title: 'Display album',
                value: true
            },
            displayArtistName: {
                title: 'Display artist name',
                value: true
            }
        }
    }
]