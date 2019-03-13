const express = require('express');
const charactersListController = require('../controllers/characters_list');
const { body } = require('express-validator/check')
const router = express.Router();

router.get('/characters_list', charactersListController.getCharactersList);

module.exports = router;