const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeveloperComputerSchema = new Schema ({
  computerID: String,
  serialNO: String,
  informationLink: String,
  users: Array,
  handoutDate: Date,
  status: String,
  licenseLink: String,
});

const devComputer = mongoose.model('devComputer', DeveloperComputerSchema, 'DeveloperComputers');

module.exports = devComputer;