const express = require('express');
const feedRoutes = require('./routes/feed');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);

mongoose.connect('mongodb+srv://farid:7Oe8xKbCWRyK5Wbl@myblogger-x46xi.mongodb.net/test?retryWrites=true')
.then(() => app.listen(5000))
.catch((err) => console.log(err));