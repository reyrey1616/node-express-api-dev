const express = require('express');
const dotenv = require('dotenv');

const bootcamps = require('./routes/bootcamps');

// LOAD ENV vars
dotenv.config({ path: './config/config.env' });

// INITIALIZED EXPRESS
const app = express();

// MOUNT routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode  on port ${PORT}!`
  );
});
