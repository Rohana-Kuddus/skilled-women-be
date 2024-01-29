const { User } = require("../models");
const bcrypt = require('bcrypt');

// const jwt = require('jsonwebtoken');
// const saltRound = 10;
// require('dotenv').config();

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      message: "Success get all users",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId, } });
    
    res.status(200).json({
      message: "Succes get user by Id",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, gender, image, CityId } = req.body;

    const updateProfile = {
      username: username,
      email: email,
      gender: gender,
      image: image,
      CityId: CityId,
    };

    const updatedProfile = await User.update(updateProfile, {
      where: {
        id: userId,
      },
    });

    res.status(200).json({
      message: "User Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


const updateUserPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if(newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Password confirmation does not match",
      });
    }

    const user = await User.findByPk(userId);
    if(!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isOldPasswordValid = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(401).json({
        message: "Old password is incorrect",
      });
    }

    const saltRounds = 10;
    const newHashPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = newHashPassword;
    await user.save();

    res.status(201).json({
      message: "Password has succesfully changed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports = {
  getAllUser,
  getUserById,
  updateUserProfile,
  updateUserPassword,
};