const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coreCellphoneSchema = new Schema({
  name: String,
  imei: String,
  type: String,
})

const coreCellphone = mongoose.model('coreCellphone', coreCellphoneSchema, 'CoreCellphones');

module.exports = coreCellphone;