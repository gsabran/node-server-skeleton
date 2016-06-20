const ping = require('./ping.js');

module.exports = {
  load: (app) => {
    ping.load(app);
  },
};
