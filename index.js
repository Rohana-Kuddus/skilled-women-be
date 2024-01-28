const express = require('express');
const { auth } = require('./routes/auth');
const { industry } = require('./routes/industry');
const { classes } = require('./routes/class');
const app = express();
require('dotenv').config();

app.use(express.json());

app.listen(process.env.PORT, () => {
 console.log(`Running on port ${process.env.PORT}`);
});

//route
app.use(auth);
app.use(industry);
app.use(classes);