const express = require('express');
const classes = require('./routes/class');
const auth = require('./routes/auth');
const industry = require('./routes/industry');
const city = require('./routes/city');
const job = require('./routes/job');
const user = require('./routes/user');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});

app.use(express.json());

// routes
app.use(classes);
app.use(auth);
app.use(industry);
app.use(job);
app.use(user);
app.use(city);