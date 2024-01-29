const { Industry } = require('../models');

const getAllIndustries = async (req, res) => {
  try {
    const data = await Industry.findAll({
      attributes: ['id', 'name', 'image']
    });

    return res.status(200).send({ message: 'Get All Industries Success', data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}

module.exports = {
  getAllIndustries
}
