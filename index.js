const express = require('express');
const cityRoutes = require('./routes/city')
const app = express();
require('dotenv').config();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});

//route
app.use(cityRoutes);