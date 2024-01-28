const { Roadmap, Course, RoadmapCourse } = require('../models');
const urlMetadata = require('url-metadata');

const addClass = async (req, res) => {
  try {
    // const { id } = req.user;
    const id = '';
    const { roadmapId, name, link, paid, description } = req.body;

    // function get image from link
    // const metadata = await urlMetadata(
    //   'https://academy.apiary.id/growth-hacking-summit-2024', {
    //   mode: 'same-origin',
    //   includeResponseBody: true
    // });
    // console.log(metadata.responseBody.find('img'));

    const payload = {
      name,
      image: '',
      description,
      paid,
      link,
      rating: 0,
      userId: id ? id : null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const course = await Course.create(payload);

    // create new array to save roadmap course
    const payloadRoadmap = roadmapId.map(v => {
      const obj = {
        roadmapId: v,
        courseId: course.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      return obj;
    });
    await RoadmapCourse.bulkCreate(payloadRoadmap);

    res.status(201).send({ message: 'Create Class Success' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  };
};

const getClassDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Course.findOne({ where: { id } });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  };
};

module.exports = {
  addClass,
  getClassDetail
};