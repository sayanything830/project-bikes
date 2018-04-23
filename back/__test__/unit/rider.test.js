'use strict';

const Rider = require('../../model/rider.js');
require('jest');

describe('Rider Module', function() {
  let newRider = new Rider({
    name: 'Bob',
  });
  describe('Rider schema', () => {
    it('should create a object', () => {
      expect(newRider).toBeInstanceOf(Object);
    });
    it('should have a name and bikes property', () => {
      expect(newRider).toHaveProperty('name');
      expect(newRider).toHaveProperty('bikes');
    });
  });
});
