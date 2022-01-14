const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../../middlewares/auth.middleware');
const widgetsController = require('./widgets.controller');

router.get('/', widgetsController.getAllWidgetsConf);

router.post('/', authMiddleware, widgetsController.createWidget);
router.patch('/', authMiddleware, widgetsController.updateWidget);
router.delete('/', authMiddleware, widgetsController.deleteWidget);

module.exports = router;