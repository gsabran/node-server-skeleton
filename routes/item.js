'use strict';
const ObjectID = require('mongodb').ObjectID;

module.exports = {
  load: (app) => {

    /*
     * add a simple item to the db
     */
    app.post('/item', (req, res, next) => {
      const { db, body } = req,
        { name } = body;

      db.items.insert({ name })
        .then((item) => res.respond(null, { item }));
    });

    /*
     * get an item
     */
    app.get('/item/:itemId', (req, res, next) => {
      const { db, params } = req,
        { itemId } = params;

      db.items.find({ _id: ObjectID(itemId) })
        .then((items) => {
          const item = items[0];
          if (item) {
            res.respond(null, { item });  
          } else {
            res.respond({ status: 404, message: 'no such item' });
          }
        });
    });

    /*
     * return the number of items in the db
     */
    app.get('/items/count', (req, res, next) => {
      const { db } = req;

      db.items.count()
        .then((count) => res.respond(null, { count }));
    });
  },
};
