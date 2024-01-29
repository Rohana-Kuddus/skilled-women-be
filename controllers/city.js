const { City } = require('../models');

//GET all cities
module.exports = {
  getAllCity: async (req, res) => {
    try {
      const cities = await City.findAll();

      res.status(200).json({
        message: "Sucees get all cities",
        data: cities
      });

    } catch (error) {
      res.status(505).json({ 
        message: error
      })
    }
  },

  //GET city by Id
  getCityById: async (req, res) => {
    try {
      const city = await City.findOne({ 
        where: {
          id: req.params.id,
        },
      });
      
      if (city) {
        res.status(200).json({
          message: `succeed get city by id ${req.params.id}`,
          data: city,
        })
        
      } else {
        res.status(400).json({
          mesage: `No city with id ${req.params.id}`,
        })
      }
    } catch (error) {
      res.status(505).json({
        message: "Internal Server Error",
      });
    }
  }
};