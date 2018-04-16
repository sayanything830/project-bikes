'use strict';

module.exports = function(error, response) {
  let message = error.message.toLowerCase();

  switch(true) {
  case message.includes('validation'): return response.status(400).send(`${error.name}: ${error.message}`);
  case message.includes('enoent'): return response.status(404).send(`${error.name}: ${error.message}`);
  case message.includes('path error'): return response.status(404).send(`${error.name}: ${error.message}`);
  case message.includes('objectid failed'): return response.status(404).send(`${error.name}: ${error.message}`);
  case message.includes('duplicate key'): return response.status(409).send(`${error.name}: ${error.message}`);
  default: return response.status(500).send(`${error.name}: ${error.message}`);
  }
};
