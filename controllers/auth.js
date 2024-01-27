// const User = require('../models/user')
const { User } = require("../models");

 
// register new user 
const register = async (req, res) => {
    try {
        const { 
            username, 
            email, 
            password, 
            gender, 
            image, 
            cityId } = req.body;
        
        const newUserData = {
            username: username, 
            email: email, 
            password: password, 
            gender: gender, 
            image: image ? image: '', 
            cityId: cityId 
        }

       const newUser  = await User.create(newUserData);
       res.status(201).send('success add data')

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: 'Internal server error' })
    }
}

module.exports = {
    register
}