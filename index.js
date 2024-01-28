const express = require('express');
const classes = require('./routes/class');
const app = express();
require('dotenv').config();

app.listen(process.env.PORT, () => {
 console.log(`Running on port ${process.env.PORT}`);
});

app.use(express.json());

// routes
app.use(classes);