const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/Tour');

dotenv.config({ path: `../../config.env` });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB Connected...');
});

const dataLocal = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async (req, res) => {
  try {
    await Tour.create(dataLocal);
    console.log(`success loaded data`);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (req, res) => {
  try {
    await Tour.deleteMany();
    console.log(`success delete data`);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
