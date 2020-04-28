const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middlewares/logger');
const bootcamps = require('./routes/bootcamps');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

// LOAD ENV vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

// INITIALIZED EXPRESS
const app = express();

// Dev logging middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// MOUNT routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode  on port ${PORT}!`.blue.bold
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server and exit process
  server.close(() => process.exit(1));
});
