'use strict';

// *** Application Dependencies *** //
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./error-handler');

// *** Application Setup *** //
const app = express();
const router = express.Router();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// *** Middleware *** //
require('../route/route-bike');
require('../route/route-rider');
app.use(cors());
app.use('api/v1', router);
app.use('/{0,}', (request, response) => errorHandler(new Error('Path error. Route not found.'), response));

// *** Server Controls *** //
const server = module.exports = {};
server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn) return reject(new Error('Server running. Cannot start server again'));

    server.http = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
      server.isOn = true;
      server.db = mongoose.connect(MONGODB_URI);
      return resolve(server);
    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) return reject(new Error('Server is already off, cannot shut down'));

    server.http.close(() => {
      console.log('Shutting down server');
      mongoose.disconnect();
      server.isOn = false;
      return resolve(server);
    });
  });
};
