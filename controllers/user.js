const { User, City } = require('../models');
const bcrypt = require('bcrypt');

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt', 'CityId'] },
      include: City,
      raw: true,
      nest: true
    });
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    };

    user.city = user.City.name;
    delete user.City;
    
    return res.status(200).json({
      message: 'Success Get User Profile',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  };
};

const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { username, email, gender, image, cityId } = req.body;

    const updateProfile = {
      username,
      email,
      gender,
      image,
      CityId: cityId,
      updatedAt: new Date()
    };

    await User.update(updateProfile, { where: { id } });

    res.status(200).json({
      message: 'User Profile Updated',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};


const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { password } = req.body;

    const user = await User.findByPk(id);
    if(!user) {
      return res.status(404).json({
        message: 'User Not Found',
      });
    };

    const saltRounds = 10;
    const newHashPassword = await bcrypt.hash(password, saltRounds);

    user.password = newHashPassword;
    user.updatedAt = new Date();

    await user.save();

    res.status(201).json({
      message: 'Update Password Success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  };
};


module.exports = {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
};




