const bcrypt = require("bcrypt");
const { User } = require("../models");

const secret_key = process.env.SECRET_KEY
const saltRounds = 10

// register new user 
const register = async (req, res) => {
    try {
        const { 
            username, 
            email, 
            password, 
            gender, 
            image, 
            cityId 
        } = req.body;

        const hasedPassword = bcrypt.hashSync(password, saltRounds)
        
        const newUserData = {
            username: username ? username: null, 
            email: email ? email: null, 
            password: hasedPassword ? hasedPassword : null , //json "password": "" masih masuk ke db
            gender: gender ? gender: null, 
            image: image ? image: '', 
            cityId: cityId ? cityId: null 
        }
    
       await User.create(newUserData);
       res.status(201).send('success add data')

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: 'Internal server error' })
    }
}

module.exports = {
    register
}