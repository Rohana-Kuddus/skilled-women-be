const jwt = require("jsonwebtoken");
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
        
        // masih bingung cara agar username jadi unique

        await User.create(newUserData);
        res.status(201).send('success add data')

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: 'Internal server error' })
    }
}

//user login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userInDB = await User.findOne({ where: { email: email } }); //find((user) => user.email == email);

        if (!userInDB) {
            return res.status(401).send('username not found');
        }

        //compare hash password from database with password input
        const isPasswordMatch = await bcrypt.compare(password, userInDB.password);
        if (isPasswordMatch) {
            //create a JWT token with user information
            const token = jwt.sign(email, secret_key);

            //send token to the user
            res.json({ token });
        } else {
            return res.status(401).send('Wrong password');
        }
        
    } catch (error) {
        console.log(error.messagfe);
        res.status(500).send({ message: 'Internal server error' });
    }
}

// user logout
const logout = async (req, res) => {
    try {
        //clear JWT token and redirect to /login
        res.clearCookie('Authorization');
        // res.redirect('/login');

        res.send('logout success');
        
        // const token = req.headers['Authorization'];
        // res.json({ token });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
}
module.exports = {
    register,
    login,
    logout
}