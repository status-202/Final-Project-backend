const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoreComputerSchema = new Schema({
  computerId: String,
  serialNO: String,
  type: String,
  licenseLink: String,
  users: Array,
  Comments: Array,
});

const coreComputer = mongoose.model('coreComputer', CoreComputerSchema, 'CoreComputers');

module.exports = coreComputer;