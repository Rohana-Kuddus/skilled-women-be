const express = require('express');
const multer = require('multer');
const { getUserProfile, updateUserProfile, updateUserPassword } = require("../controllers/user");
const { verifyToken } = require('../middlewares/auth');
const upload = multer({ dest: 'uploads/' });
const user = express.Router();

user.get('/users', verifyToken, getUserProfile);
user.put('/users', verifyToken, upload.single('image'), updateUserProfile);
user.patch('/users', verifyToken, updateUserPassword);

module.exports = user;