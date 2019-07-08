const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MuaSchema = new Schema({
    title: String,
    link: String,
    thumbnail: String,
    content: String,
    price: String,
    city: String,
    dist: String,
    area: String,
    price: String,
    date: Date,
    type: String,
})

module.exports = mongoose.model('Mua', MuaSchema);