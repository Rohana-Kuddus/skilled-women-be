const express = require('express');
const multer = require('multer');
const { getUserProfile, updateUserProfile, updateUserPassword, getUserImage } = require("../controllers/user");
const { verifyToken } = require('../middlewares/auth');

// save file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null, new Date().valueOf() + '_' + file.originalname
    );
  }
});
const upload = multer({ storage });

const user = express.Router();

user.get('/users', verifyToken, getUserProfile);
user.put('/users', verifyToken, upload.single('image'), updateUserProfile);
user.patch('/users', verifyToken, updateUserPassword);
user.get('/users/image', verifyToken, getUserImage);

module.exports = user;