const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  characters_collection_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('anime_lists', animesSchema);