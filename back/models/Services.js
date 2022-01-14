
const ServicesSchema = {
    spotify: {
        access_token: {
            type: String,
            default: null
        },
        refresh_token: {
            type: String,
            default: null
        }
    },
    twitch: {
        access_token: {
            type: String,
            default: null
        },
        refresh_token: {
            type: String,
            default: null
        }
    },
    github: {
        access_token: {
            type: String,
            default: null
        },
        refresh_token: {
            type: String,
            default: null
        }
    }
}

module.exports = ServicesSchema;