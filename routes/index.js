'use strict';
const ping = require('./ping.js');
const item = require('./item.js');

module.exports = {
  load: (app) => {
    ping.load(app);
    item.load(app);
  },
};
