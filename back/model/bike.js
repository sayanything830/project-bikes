'use strict';

const mongoose = require('mongoose');
const Rider = require('./rider');

const Bike = mongoose.Schema({
  'make': {type: String},
  'model': {type: String},
  'year': {type: Number},
  'type': {type: String},
  'rider': {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'riders'},
});

Bike.pre('save', function(next) {
  Rider.findById(this.rider)
    .then(rider => {
      let bikeIds = new Set(rider.bikes);
      bikeIds.add(this._id);
      rider.bikes = [...bikeIds];
      rider.save();
    })
    .then(next)
    .catch(() => next(new Error('Validation Error, failed to save bike')));
});

Bike.post('remove', function(doc, next) {
  Rider.findById(doc.rider)
    .then(rider => {
      rider.bikes = rider.bikes.filter(bike => bike._id !== doc._id);
      return rider.save();
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('bikes', Bike);
