const express = require('express');

const { auth } = require('./routes/auth');
const { industry } = require('./routes/industry');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/user');
app.use(express.json());

app.listen(process.env.PORT, () => {
 console.log(`Running on port ${process.env.PORT}`);
});



//routes

app.use(auth);
app.use(industry);
app.use(userRoutes);