const { Job, Industry, Sequelize } = require('../models');

const getAllJob = async (req, res) => {
  try {
    const { industry, search } = req.query;

    const payload = {
      include: {
        model: Industry
      }, 
      attributes: ['id', 'name', 'image', 'cta' ]
    };

    if (search) {
      payload.where = {
        name: {
          [Sequelize.Op.like]: `%${search}%` 
        } 
      };
    };

    if (industry) {
      payload.include.where = {
        name: industry
      };
    };

    const data = await Job.findAll(payload);
    if (data.length === 0) {
      return res.status(404).json({ message: 'Data Not Found' });
    };

    const result = data.map(v => {
      const obj = {
        id: v.id,
        title: v.name,
        image: v.image,
        industry: v.Industry.name,
        description: v.cta
      };
      return obj;
    });

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  };
};

module.exports = {
  getAllJob
};