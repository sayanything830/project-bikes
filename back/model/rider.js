'use strict';

const mongoose = require('mongoose');

const Rider = mongoose.Schema({
  'name': {type: String},
  'bikes': [{type: mongoose.Schema.Types.ObjectId, ref: 'bikes'}],
});

module.exports = mongoose.model('riders', Rider);
