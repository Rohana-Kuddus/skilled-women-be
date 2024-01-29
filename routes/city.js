const express = require('express');
const route = express.Router();

const {
  getAllCity, 
  getCityById
} = require('../controllers/city'); // import tea controller
// const verifyToken = require("../middlewares/auth")


//endpoints:
route.get('/cities', getAllCity); 
route.get('/cities/:id', getCityById); 

// Jika pakai token
// route.get('/cities', verifyToken, getAllCity); 
// route.get('/:id', verifyToken, getCityById); 

module.exports = route;