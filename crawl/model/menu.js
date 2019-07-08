const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MenuSchema = new Schema({
    name: String,
    link: String,
    parent: Schema.ObjectId,
})

module.exports = mongoose.model('Menu', MenuSchema);