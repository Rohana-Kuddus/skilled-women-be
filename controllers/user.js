const  { User } = require("../models");
const  { City } = require("../models");
// const bcrypt = require('bcrypt');

// const jwt = require('jsonwebtoken');
// const saltRound = 10;
// require('dotenv').config();/]

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.findAll();
            
      res.status(200).json({
        message: "Success get all users",
        data: users
      });

    } catch (error) {
      res.status(500).json({
        message: error
      })
    }
  },
  
  getUserCities: async (req, res) => {
    try {
      const cities = await City.findAll({
        where: {
          city_id: req.params.id,
        },
      });

      if(cities){
        res.status(200).json({
          message: `Succes get cities by Id cities`,
          data: cities,
        })
      } else {
        res.status(404).json({
          messsage: `Failed to get cities by id user`,
        })
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, gender, image } =  req.body; 
      
      const user = await User.findOne({ where: { id } });
      if (!data) {
        res.status(404).json({ message: 'User Not Found' });
      };
      
      const payload = {
        username: username ? username : data.username,
        email: email ? email : data.email,
        gender: gender ? gender : data.gender,
        iamge: image ? image : data.image
      };

      await user.update(payload, { where: { id } });
    
      res.status(200).json({
        message: "User profile Updated"
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  }
};