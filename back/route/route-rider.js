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

    .post(bodyParser, (request, response) => {
      new Rider(request.body).save()
        .then(rider => response.status(201).json(rider))
        .catch(error => errorHandler(error, response));
    })
    .put(bodyParser, (request, response) => {
      Rider.findOne({
        id: request.params._id,
      })
        .then(rider => {
          if(!rider) return Promise.reject(new Error('No Rider Found'));
          return rider.set(request.body).save();
        })
        .then(() => response.sendStatus(204))
        .catch(error => errorHandler(error, response));
    })
    .delete((request, response) => {
      return Rider.findById(request.params._id)
        .then(rider => {
          if(rider) return rider.remove();
          return errorHandler(new Error('Delete Failed, unable to find rider'), response);
        })
        .then(() => response.sendStatus(204))
        .catch(error => errorHandler(error, response));
    });
};

