require('dotenv').config();
const express = require('express');
const cityRoutes = require('./routes/city')

const app = express(); // membuat express App

app.use(express.json()); // menerima jsond dari body disaat POST request
app.use(cityRoutes); // ambil  routes city

app.listen(process.env.PORT, () => {
 console.log(`Running on port ${process.env.PORT}`);
});