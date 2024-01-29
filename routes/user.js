const express = require('express');
const route = express.Router();
// const verifyToken = require("../middlewares/auth")

const {
  getAllUser,
  getUserById,
  updateUserProfile,
  updateUserPassword,
} = require("../controllers/user");

route.get('/users', getAllUser);
route.get('/users/:userId', getUserById);
route.put('/users/:userId', updateUserProfile);
route.patch('/users/:userId', updateUserPassword);

module.exports = route;