const express = require("express");
const industryController = require('../controllers/industry');
const industry = express.Router();

industry.get('/industries', industryController.getAllIndustries);

module.exports = industry;