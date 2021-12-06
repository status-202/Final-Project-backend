const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoreComputerSchema = new Schema({
  computerID: String,
  serialNO: String,
  type: String,
  licenseLink: String,
  users: Array,
  comments: String,
  currentFileValueKey: String,
  handoutDate: Date,
  chargerNumber: String,
});

const coreComputer = mongoose.model('coreComputer', CoreComputerSchema, 'CoreComputers');

module.exports = coreComputer;