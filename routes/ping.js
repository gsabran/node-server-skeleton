'use strict';

module.exports = {
  load: (app) => {
    app.get('/ping', (req, res, next) => {
      res.respond(null, { pong: 'pong' });
    });
  },
};
