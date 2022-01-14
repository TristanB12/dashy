const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../../middlewares/auth.middleware');
const servicesController = require('./services.controller');

router.post('/widget/:code', authMiddleware, servicesController.getWidgetContent);

router.post('/spotify/link', authMiddleware, servicesController.linkSpotify);
router.post('/twitch/link', authMiddleware, servicesController.linkTwitch);
router.post('/github/link', authMiddleware, servicesController.linkGithub);
router.get('/spotify/widgets', servicesController.availableWidgets);

module.exports = router