const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BanSchema = new Schema({
    title: String,
    link: String,
    thumbnail: String,
    content: String,
    contact: String,
    mobile: String,
    price: String,
    city: String,
    dist: String,
    area: String,
    price: String,
    date: Date,
    type: String,
})

module.exports = mongoose.model('Ban', BanSchema);