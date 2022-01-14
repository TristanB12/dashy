const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');

router.get('/verify', authController.verify);

router.post('/login', authController.login);
router.post('/login/github', authController.loginWithGithub);
router.post('/login/facebook', authController.loginWithFacebook);

router.post('/signup', authController.signup);
router.post('/signup/github', authController.signupWithGithub);
router.post('/signup/facebook', authController.signupWithFacebook);

module.exports = router;