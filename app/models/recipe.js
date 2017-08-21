// Example model

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var RecipeSchema = new Schema({
  title: String,
  vidUrl: String,
  steps: [String]
})

RecipeSchema.virtual('date')
  .get(function () {
    return this._id.getTimestamp()
  })

mongoose.model('Recipe', RecipeSchema)
