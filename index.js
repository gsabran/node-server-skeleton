'use strict';

const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');

// confifure the app
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// connect to database
const pmongo = require('promised-mongo');
const dbName = 'surprise-project',
  dbCollections = ['items'];
const db = pmongo(dbName, dbCollections);

// make db accessible in all requests
app.use((req, res, next) => {
  req.db = db;
  next();
});

// make available a function to respond easily with json
app.use((req, res, next) => {
  res.respond = (err, payload) => {
    res.setHeader('Content-Type', 'application/json');
    let wrapperPayload;

    if (err) {
      wrapperPayload = {
        ok: false,
        error: err,
      };
    } else {
      wrapperPayload = {
        ok: true,
        response: payload,
      }
    }

    res.send(JSON.stringify(wrapperPayload));
  };
  next();
});

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
