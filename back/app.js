const express = require('express');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const path = require('path');
const { mongoConnect } = require('./services/mongoose');
const app = express();
require('dotenv').config()

mongoConnect();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

const apiAuthRoutes = require('./api/auth/auth.routes');
const apiServicesRoutes = require('./api/services/services.routes');
const apiUserRoutes = require('./api/user/user.routes');
const widgetsUserRoutes = require('./api/widgets/widgets.routes');
const aboutJson = require('./services/about');

app.use('/api/auth', apiAuthRoutes);
app.use('/api/services', apiServicesRoutes);
app.use('/api/user', apiUserRoutes);
app.use('/api/widgets', widgetsUserRoutes);
app.get('/api/about.json', aboutJson)

if (process.env.NODE_ENV === 'production') {
    const staticFileMiddleware = express.static(path.join(__dirname + '/public/'));

    app.use(staticFileMiddleware);
    app.use(history({
        disableDotRule: true,
        verbose: true
    }));
    app.use(staticFileMiddleware);
    app.get('/', (req, res) => res.render(path.join(__dirname + '/public/index.html')));
}

module.exports = app;