const express = require('express');
const { addClass, getClassDetail } = require('../controllers/class');
const classes = express.Router();

// endpoits
classes.post('/classes', addClass); // buat kelas
classes.get('/classes/:id', getClassDetail);

module.exports = classes;