const fs = require('fs');
const path = require('path');

const io = require('../socket');
const { validationResult } = require('express-validator/check')
const CharactersSchema = require('../models/characters_lists');

exports.getCharactersList = async (req, res, next) => {
  let totalItems = 0;
  try {
    const count = await CharactersSchema(req.query.list_name).find().countDocuments();
    totalItems = count;
    const characters = await CharactersSchema(req.query.list_name).find();
    res.status(200).json({
      message: 'Characters List Fetched',
      results: characters,
      totalItems
    });
  } catch(err) {
    if(!err.status) {
      err.status = 500;
    }
    next();
  }
};