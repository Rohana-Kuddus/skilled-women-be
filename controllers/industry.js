const { Industry } = require("../models");

const getAllIndustries = async (req, res) => {
    try {
        const data = await Industry.findAll({
            attributes: ['id', 'name', 'image']
          });

        res.status(200).send({'data' : data });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getAllIndustries
}
