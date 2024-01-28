const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, City } = require("../models");

const UserCity = User.belongsTo(City, { as: 'city' }); //User assosiate with City

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

        if (!username || !email || !password || !gender) {
            return res.status(400).send({ message: 'invalid Data' })
           }

        const hasedPassword = bcrypt.hashSync(password, saltRounds)
        
        const newUserData = {
            username: username, 
            email: email, 
            password: hasedPassword,
            gender: gender, 
            image: image, 
            cityId: cityId 
        }
        
        const userInDB = await User.findOne({ where: { username: username } }); 

        if (userInDB) {
            return res.status(409).send({ message: 'Username Already Exists' })
        } 
       
        // include assosiation
        await User.create(newUserData, {
            include: [ UserCity ]
        });
        
        return res.status(201).send('User Registration Success')

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

//user login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userInDB = await User.findOne({ where: { email: email } });

        if (!userInDB) {
            return res.status(401).send('Username Not Found');
        }

        //compare hash password from database with password input
        const isPasswordMatch = await bcrypt.compare(password, userInDB.password);
        if (isPasswordMatch) {
            //create a JWT token with user information
            const token = jwt.sign(email, secret_key);

            //send token to the user
            res.json({ token });
        } else {
            return res.status(401).send('Wrong Password');
        }
        
    } catch (error) {
        console.log(error.messagfe);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}

// user logout
const logout = async (req, res) => {
    try {
        //clear JWT token and redirect to /login
        res.clearCookie('Authorization');
        // res.redirect('/login');

        return res.status(200).send('User Logout Success');
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}
module.exports = {
    register,
    login,
    logout
}