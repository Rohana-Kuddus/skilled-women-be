const express = require('express');
const { getAllJob } = require('../controllers/job');
const job = express.Router();

// endpoits
job.get('/jobs', getAllJob);

module.exports = job;