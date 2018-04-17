'use strict';

const Rider = require('../model/rider');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.route('/rider/:_id?')
    .get((request, response) => {
      if(request.params._id) {
        return Rider.findById(request.params._id)
          .then(rider => response.status(200).json(rider))
          .catch(error => errorHandler(error, response));
      }

      return Rider.find()
        .then(riders => response.status(200).json(riders))
        .catch(error => errorHandler(error, response));
    })

    .post()
    .put()
    .delete();
};
