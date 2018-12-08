const express = require('express');
const feedRoutes = require('./routes/feed');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

app.use('/feed', feedRoutes);

app.listen(5000);