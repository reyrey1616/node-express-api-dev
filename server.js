const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middlewares/logger');
const bootcamps = require('./routes/bootcamps');
const morgan = require('morgan');
// LOAD ENV vars
dotenv.config({ path: './config/config.env' });

// INITIALIZED EXPRESS
const app = express();
// Dev logging middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// app.use(logger);

// MOUNT routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode  on port ${PORT}!`
  );
});
