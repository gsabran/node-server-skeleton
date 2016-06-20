
const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');

// confifure the app
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// load routes
require('./routes').load(app);

// configure the server

const http = require('http');
const server = http.Server(app);

// we're not using sockets at the moment
// const io = require('socket.io')(server);
// const sockets = require('./lib/sockets.js')(io);

// start the server
const port = 3003;
server.listen(port, function() {
  console.log('listening on *:'+port);
});
