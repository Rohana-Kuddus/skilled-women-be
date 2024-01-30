const { City } = require('../models');

const getAllCity = async (req, res) => {
  try {
    const data = await City.findAll({ attributes: ['id', 'name'] });

    return res.status(200).json({ message: 'Get All Cities Success', data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  };
};

module.exports = {
  getAllCity
};