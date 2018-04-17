'use strict';

const mongoose = require('mongoose');

const Rider = mongoose.Schema({
  'name': {type: String, required: true},
  'bikes': [{type: mongoose.Schema.Types.ObjectId, ref: 'bikes'}],
});

module.exports = mongoose.model('riders', Rider);
