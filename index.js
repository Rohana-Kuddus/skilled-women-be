const express = require('express');
const classes = require('./routes/class');
const cityRoutes = require('./routes/city')
const { auth } = require('./routes/auth');
const { industry } = require('./routes/industry');
const job = require('./routes/job');
const userRoutes = require('./routes/user');
const app = express();
require('dotenv').config();
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});

// routes
app.use(classes);
app.use(auth);
app.use(industry);
app.use(job);
app.use(userRoutes);
app.use(cityRoutes);