const express = require("express")

const classController = require('../controllers/class')

const classes = express.Router()

classes.get('/users/classes', classController.getUserClasses)

module.exports = {
    classes
}