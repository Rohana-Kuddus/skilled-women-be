const express = require('express');
const { getAllCity } = require('../controllers/city');
const city = express.Router();

//endpoints
city.get('/cities', getAllCity);

module.exports = city;