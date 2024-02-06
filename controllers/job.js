const { Job, Industry, Sequelize, Figure, JobBenefit, Benefit, Roadmap } = require('../models');

const getAllJob = async (req, res) => {
  try {
    const { industry, search, limit } = req.query;

    const payload = {
      include: {
        model: Industry
      },
      attributes: ['id', 'name', 'image', 'cta']
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

    if (limit) {
      payload.limit = parseInt(limit);
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

    return res.status(200).json({ message: 'Get All Job Success', data: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  };
};

const getDetailJob = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Job.findByPk(id, {
      attributes: ['id', ['name', 'title'], 'image', 'description', 'percentage', 'percentageSource', 'percentageLink',
        'income', 'incomeLink', 'video', 'roadmapSummary'],
      include: [
        {
          model: Industry,
          attributes: ['name', 'image']
        },
        {
          model: Figure,
          attributes: ['name', 'image', 'role', 'description']
        }
      ],
      raw: true,
      nest: true
    });

    const benefitData = await JobBenefit.findAll({ include: Benefit, where: { JobId: id } });

    // create list benefits
    const benefits = [];
    benefitData.map(v => {
      const obj = {
        description: v.Benefit.description,
        image: v.Benefit.image
      };
      benefits.push(obj);
    });

    const result = {
      ...data,
      benefits
    };

    return res.status(200).json({ message: 'Get Detail Job Success', data: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  };
};

const getJobRoadmap = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Roadmap.findAll({
      where: { JobId: id },
      attributes: ['id', 'name', 'step']
    });

    return res.status(200).json({ message: 'Get Job Roadmap Success', data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  };
};

module.exports = {
  getAllJob,
  getDetailJob,
  getJobRoadmap
};