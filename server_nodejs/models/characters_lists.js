const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let currentSchemaName = '';
const currentSchema = new Schema({
  title: {
    type: String,
    required: true,
  }
})

module.exports = characterSchema = (schemaName) => {
  return mongoose.model(schemaName, currentSchema)
}