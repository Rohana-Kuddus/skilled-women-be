const express = require("express")

const authController = require('../controllers/auth')
const { verifyToken } = require("../middlewares/auth")

const auth = express.Router()

auth.post('/auth/register', authController.register)
auth.post('/auth/login', authController.login)
auth.get('/auth/logout', verifyToken, authController.logout)

module.exports = auth;