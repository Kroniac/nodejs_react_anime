const fs = require('fs');
const path = require('path');

const io = require('../socket');
const { validationResult } = require('express-validator/check')
const Animes = require('../models/animes');

exports.getAnimes = async (req, res, next) => {
  let totalItems = 0;
  try {
    const count = await Animes.find().countDocuments();
    totalItems = count;
    const animes = await Animes.find();
    res.status(200).json({
      message: 'Anime Fetched',
      results: animes,
      totalItems
    });
  } catch(err) {
    if(!err.status) {
      err.status = 500;
    }
    next();
  }
};

exports.postAnime = (req, res, next) => {
  const title = 'Black Clover';
  const anime = new Animes({
    title,
    characters_collection_name: 'black_clover',
  });
  anime
    .save()
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err);
    })
}