'use strict';

const Bike = require('../model/bike');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.route('/bike/:_id?')
    .get((request, response) => {
      if(request.params._id) {
        return Bike.findById(request.params._id)
          .populate('rider')
          .then(bike => response.status(200).json(bike))
          .catch(error => errorHandler(error, response));
      }

      return Bike.find()
        .then(bike => response.status(200).json(bike))
        .catch(error => errorHandler(error, response));
    })

    .post(bodyParser, (request, response) => {
      return new Bike(request.body).save()
        .then(bike => response.status(201).json(bike))
        .catch(error => errorHandler(error, status));
    })

    .put(bodyParser, (request, response) => {
      Bike.findOne({ id: request.params._id})
        .then(bike => {
          if(!bike) return Promise.reject(new Error('Update failed, unable to find bike'));
          return bike.set(request.body).save();
        })
        .then(() => response.sendStatus(204))
        .catch(error => errorHandler(error, response));
    })

    .delete((request, response) => {
      return Bike.findById(request.params._id)
        .then(bike => {
          if(bike) return bike.remove();
          return errorHandler(new Error('Delete failed, unable to find bike'), response);
        })
        .then(() => response.sendStatus(204))
        .catch(error => errorHandler(error, response));
    });
};
