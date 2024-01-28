const express = require("express")

const authController = require('../controllers/auth')

// express.Router()
const auth = express.Router()

auth.post('/auth/register', authController.register)
auth.post('/auth/login', authController.login)
auth.get('/auth/logout', authController.logout)

module.exports = {
    auth
}