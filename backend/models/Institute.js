const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
  instituteName: {
    type: String,
    required: true,
  },
  instituteAddress: {
    type: String,
    required: true,
  },
  instituteContact: {
    type: String,
    required: true,
  },
  instituteEmail: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Institute', instituteSchema);
