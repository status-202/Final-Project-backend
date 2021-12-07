const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coreCellphoneSchema = new Schema({
  cellphoneID: String,
  name: String,
  imei: String,
  type: String,
  comments: String,
})

const coreCellphone = mongoose.model('coreCellphone', coreCellphoneSchema, 'CoreCellphones');

module.exports = coreCellphone;