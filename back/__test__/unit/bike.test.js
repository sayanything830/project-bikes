'use strict';

const Bike = require('../../model/bike.js');
require('jest');

describe('Bike Module', function() {
  let newBike = new Bike({
    make: 'bianchi',
    model: 'imola',
    year: 2010,
  });
  describe('Bike schema', () => {
    it('should create a object', () => {
      expect(newBike).toBeInstanceOf(Object);
    });
    it('should contain properties of make, model, and year', () => {
      console.log(newBike);
      expect(newBike).toHaveProperty('make');
      expect(newBike).toHaveProperty('model');
      expect(newBike).toHaveProperty('year');
    });
  });
});
