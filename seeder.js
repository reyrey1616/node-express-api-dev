const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// LOAD ENV VARIABLES
dotenv.config({ path: './config/config.env' });

// load models
const Bootcamp = require('./models/Bootcamp');

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//     Read the json files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// IMPORT into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log(`Data imported...`.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Destroy Data into DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log(`Data Destroyed...`.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}