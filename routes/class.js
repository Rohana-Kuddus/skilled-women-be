const express = require('express');
const { addClass, getClassDetail, editClass, deleteClass } = require('../controllers/class');
const classes = express.Router();

// endpoits
classes.post('/classes', addClass);
classes.get('/classes/:id', getClassDetail);
classes.put('/classes/:id', editClass);
classes.delete('/classes/:id', deleteClass)

module.exports = classes;