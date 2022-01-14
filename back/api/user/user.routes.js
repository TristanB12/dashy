const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../../middlewares/auth.middleware');
const userController = require('./user.controller');

router.get('/', authMiddleware, userController.getUserInfos);
router.get('/widgets', authMiddleware, userController.getUserWidgets);

module.exports = router;