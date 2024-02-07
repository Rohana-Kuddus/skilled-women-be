const express = require("express");
const authController = require('../controllers/auth');
const auth = express.Router();

auth.post('/auth/register', authController.register);
auth.post('/auth/login', authController.login);
auth.patch('/auth/password', authController.resetPassword);
auth.post('/auth/user', authController.checkUser);

module.exports = auth;