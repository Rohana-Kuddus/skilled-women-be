const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  updateUserPassword
} = require("../controllers/user");
const { verifyToken } = require('../middlewares/auth');
const user = express.Router();

user.get('/users', verifyToken, getUserProfile);
user.put('/users', verifyToken, updateUserProfile);
user.patch('/users', verifyToken, updateUserPassword);

module.exports = user;