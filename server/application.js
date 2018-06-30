const express = require('express');
const path = require('path');
const db = require('../database/index.js');
const redis = require('redis');

const client = redis.createClient();

const app = express();

app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public/index.html')));
app.use('/menusBundle.js', express.static(path.join(__dirname, '../public/dist/bundle.js')));

client.on('connect', function() {
    console.log('Redis client connected');
});

app.get('/menus/restaurant/:restaurantId/menu', (req, res) => {
  const dbRetrieve = () => {
    db.retrieve(req.params.restaurantId, (err, result) => {
      if (err && err.message.includes('Cast to number failed for value "NaN"')) {
        res.status(400).json('Bad request');
      } else if (err) {
        res.status(500).json('Unable to retrieve menu data from database');
      } else {
        res.status(200).json(result);
        client.setex(req.params.restaurantId, 300, result.toString());
      }
    });
  }
  client.get(req.params.restaurantId, (err, result) => {
    if (err) {
      dbRetrieve();
    } else {
      res.status(200).json(result);
    }
  });
});

app.post('/menus/restaurant/:restaurantId/menu', (req, res) => {
  db.post(req.params.restaurantId, (err, result) => {
    if (err) {
      res.status(500);
    } else {
      res.status(201);
    }
  });
});

app.put('/menus/restaurant/:restaurantId/menu', (req, res) => {
  db.put(req.params.restaurantId, (err, result) => {
    if (err) {
      res.status(500);
    } else {
      res.status(202);
    }
  });
});

app.delete('menu/restaurant/:restaurantId/menu', (req, res) => {
  db.delete(req.params.restaurantId, (err, result) => {
    if (err) {
      res.status(404);
    } else {
      res.status(204);
    }
  });
});

module.exports = app;
