const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/error');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// ROUTES FILES
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

// LOAD ENV vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

// INITIALIZED EXPRESS
const app = express();

//HTTP REQUEST BODY parser
app.use(express.json());

// Rate limiting | to limit the number of API request of a single IP
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 100,
});

app.use(limiter);

// Prevent HTTP Param pollution
app.use(hpp());

// Mongo Sanitize data
app.use(mongoSanitize());

// Too prevent cross site scripting/XSS
app.use(xss());

// Set security headers
app.use(helmet());

// Enable CROSS ORIGIN RESOURCE SHARING
app.use(cors());

// Cookie Parser
app.use(cookieParser());

// Dev logging middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// MOUNT routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode  on port ${PORT}!`.cyan
      .inverse.bold
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server and exit process
  server.close(() => process.exit(1));
});
