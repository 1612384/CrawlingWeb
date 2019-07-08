const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CanThueSchema = new Schema({
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
    fdate: String,
    type: String,
})

module.exports = mongoose.model('CanThue', CanThueSchema);