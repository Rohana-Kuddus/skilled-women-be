const { Op } = require('sequelize');
const { Roadmap, Course, RoadmapCourse, Job, User } = require('../models');
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

    return res.status(201).send({ message: 'Create Class Success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  };
};

const getClassDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const courseData = await Course.findByPk(id);
    if (!courseData) {
      return res.status(404).json({ message: 'Data Not Found' });
    };

    const roadmapData = await RoadmapCourse.findAll({
      where: { courseId: courseData.id },
      include: Roadmap
    });
    if (!roadmapData) {
      return res.status(404).json({ message: 'Data Not Found' });
    };

    const jobData = await Job.findByPk(roadmapData[0].Roadmap.JobId);
    if (!jobData) {
      return res.status(404).json({ message: 'Data Not Found' });
    };

    // get roadmap names
    const roadmap = [];
    roadmapData.map(v => roadmap.push(v.Roadmap.name));

    const data = {
      id,
      job: jobData.name,
      roadmap,
      name: courseData.name,
      paid: courseData.paid,
      description: courseData.description,
      link: courseData.link
    };

    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  };
};

const editClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { roadmapId, name, link, paid, description } = req.body;

    const data = await Course.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: 'Data Not Found' });
    };

    await Course.update({ name, link, paid, description }, { where: { id } });

    const roadmap = [];
    const roadmapData = await RoadmapCourse.findAll({ where: { courseId: id } });
    roadmapData.map(v => roadmap.push(v.roadmapId)); // get roadmapId values in an array

    // run code if roadmapId is edited
    if (roadmap.toString() !== roadmapId.toString()) {
      await RoadmapCourse.destroy({ where: { courseId: id } }); // replace all data to new ones

      const roadmapPayload = roadmapId.map(v => {
        const obj = {
          roadmapId: v,
          courseId: id,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        return obj;
      })
      await RoadmapCourse.bulkCreate(roadmapPayload);
    };

    return res.status(200).json({ message: 'Update Class Success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  };
};

const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Course.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: 'Data Not Found' });
    };

    await Course.destroy({ where: { id } });

    return res.status(200).json({ message: 'Delete Class Success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  };
};

const getUserClasses = async (req, res) => {
  try {
    const userId = req.user.id
    const data = await Course.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }, where: { userId: userId } });

    return res.status(200).json({ data : data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  };
};

const getClassRoadmap = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const data = await RoadmapCourse.findAll({ 
      where: { roadmapId }, 
      include: { 
        model: Course,
        include: User
      } 
      });

    const result = data.map(val => {
      const obj = {
        id: val.Course.id,
        image: val.Course.image,
        username: val.Course.User.username,
        name: val.Course.name,
        paid: val.Course.paid,
        description: val.Course.description,
        link: val.Course.link,
        rating: val.Course.rating,
      }
      return obj;
    });

    return res.status(200).json({ data: result });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  };
};

module.exports = {
  addClass,
  getClassDetail,
  editClass,
  deleteClass,
  getUserClasses,
  getClassRoadmap
};