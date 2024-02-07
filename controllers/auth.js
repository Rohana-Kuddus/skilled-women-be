const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
require('dotenv').config();

const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      gender,
      image,
      cityId
    } = req.body;

    if (!username || !email || !password || !gender) {
      return res.status(400).send({ message: 'Invalid Data' })
    };

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUserData = {
      username,
      email,
      password: hashedPassword,
      gender,
      image: image ? image : '',
      CityId: cityId
    };

    const userInDB = await User.findOne({ where: { username } });
    if (userInDB) {
      return res.status(409).send({ message: 'Username Already Exists' })
    };

    await User.create(newUserData);

    return res.status(201).send({ message: 'User Registration Success' })
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Internal Server Error' })
  };
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userInDB = await User.findOne({ where: { email } });
    if (!userInDB) {
      return res.status(401).send({ message: 'User Not Found' });
    };

    const isPasswordMatch = await bcrypt.compare(password, userInDB.password); // compare password
    if (isPasswordMatch) {
      const payload = {
        id: userInDB.id,
        email
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY);

      res.json({ token });
    } else {
      return res.status(401).send({ message: 'Wrong Password' });
    };

  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Internal Server Error' });
  };
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await User.findOne({ where: { email }});
    if(!data) {
      return res.status(404).json({ message: 'User Not Found' });
    };

    const saltRounds = 10;
    const newHashPassword = await bcrypt.hash(password, saltRounds);

    data.password = newHashPassword;
    data.updatedAt = new Date();

    await data.save();

    return res.status(200).json({ message: 'Reset Success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  };
};

const checkUser = async (req, res) => {
  try {
    const { email } = req.body;

    const data = await User.findOne({ where: { email }});
    if (!data) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    return res.json({ message: 'Check User Success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  };
};

module.exports = {
  register,
  login,
  resetPassword,
  checkUser
}