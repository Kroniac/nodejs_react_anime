const path = require('path');
const express = require('express');
const feedRoutes = require('./routes/feed');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    console.log(file)
    callback(null, uuidv4() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true);
  } else callback(null, false);
}

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status;
  const message = error.message;
  // const errors = error.errors;
  res.status(status).json({ message, errors: error.errors });
})

mongoose.connect('mongodb+srv://farid:7Oe8xKbCWRyK5Wbl@myblogger-x46xi.mongodb.net/test?retryWrites=true')
.then(() => app.listen(5000))
.catch((err) => console.log(err));