const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const faker = require('faker');
const moment = require('moment');

const GodcatSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Godcat', GodcatSchema);