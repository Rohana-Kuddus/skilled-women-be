const express = require('express');
const { addClass, getClassDetail, editClass, deleteClass } = require('../controllers/class');
const { verifyToken } = require('../middlewares/auth');
const classes = express.Router();

// endpoits
classes.post('/classes', verifyToken, addClass);
classes.get('/classes/:id', verifyToken, getClassDetail);
classes.put('/classes/:id', verifyToken, editClass);
classes.delete('/classes/:id', verifyToken, deleteClass)

module.exports = classes;