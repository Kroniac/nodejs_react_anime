const express = require('express');
const animesController = require('../controllers/animes');
const { body } = require('express-validator/check')
const router = express.Router();

router.get('/anime', animesController.getAnimes);
router.post('/anime', animesController.postAnime);

module.exports = router;