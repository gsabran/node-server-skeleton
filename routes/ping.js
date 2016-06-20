module.exports = {
  load: (app) => {
    app.get('/ping', (req, res, next) => {
      res.end('pong');
    });
  },
};
