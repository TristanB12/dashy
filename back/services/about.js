const {getAllDefaultWidgets} = require('./widgets');

const aboutJson = (req, res) => {
    let json = {
        client: {
            host: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        },
        server: {
            current_time: Date.now(),
            services: getAllDefaultWidgets()
        }
    }
    return res.status(200).json(json);
}

module.exports = aboutJson;