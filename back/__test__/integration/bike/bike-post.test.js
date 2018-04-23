'use strict';

const mock = require('../../lib/mocks');
const server = require('../../../lib/server');
const superagent = require('superagent');
require('jest');

let PORT = process.env.PORT;
let ENDPOINT_BIKE = 'api/v1/bike';

describe('POST api/v1/bike', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(mock.rider.removeAll);
  afterAll(mock.bike.removeAll);

  describe('Valid', () => {
    it('should send a 201 status', () => {
      this.fakeBike = {make: 'test', model: 'test model'};
      mock.rider.createOne()
        .then(mockRider => this.mockRider = mockRider)
        .then(ele => {
          this.fakeBike.rider = ele._id;
        });

      return superagent.post(`:${PORT}/${ENDPOINT_BIKE}`)
        .send(this.fakeBike)
        .then(response => expect(response.status).toEqual(201));
    });
  });
});
