const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ipSchema = new Schema({
  ipNumber: { type: String, required: true },
});

module.exports = mongoose.model('Ip', ipSchema);
