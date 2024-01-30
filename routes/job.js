const express = require('express');
const { getAllJob, getDetailJob, getJobRoadmap } = require('../controllers/job');
const job = express.Router();

// endpoits
job.get('/jobs', getAllJob);
job.get('/jobs/:id', getDetailJob);
job.get('/jobs/:id/roadmaps', getJobRoadmap);

module.exports = job;