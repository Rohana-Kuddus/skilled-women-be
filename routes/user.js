const express = require('express');
const route = express.Router();

const {
  getAllUser,
  getUserCities,
  updateUserProfile,
} = require("../controllers/user");
// const verifyToken = require("../middlewares/auth")

route.get('/users', getAllUser);
route.get('/:id/cities', getUserCities);
route.put('/:id', updateUserProfile);

module.exports = route;