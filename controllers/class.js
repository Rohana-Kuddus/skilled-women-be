const { Course } = require("../models");

const getUserClasses = async (req, res) => {
    try {
        const userId = req.user.id
        // const userId = '1';
        const data = await Course.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }, where: { userId: userId } });

        res.status(200).send({'data' : data });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getUserClasses
}