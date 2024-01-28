const express = require('express');
const userRoutes = require('./routes/user');
const app = express();
require('dotenv').config();

app.use(express.json());

app.listen(process.env.PORT, () => {
 console.log(`Running on port ${process.env.PORT}`);
});

app.use(userRoutes);