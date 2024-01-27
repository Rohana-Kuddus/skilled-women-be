const express = require('express');
const { auth } = require('./routes/auth');
const app = express();
require('dotenv').config();

app.use(express.json());

app.listen(process.env.PORT, () => {
 console.log(`Running on port ${process.env.PORT}`);
});

//route
app.use(auth);