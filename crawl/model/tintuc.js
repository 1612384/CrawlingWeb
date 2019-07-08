const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TinTucSchema = new Schema({
    title: String,
    link: String,
    thumbnail: String,
    content: String,
    date: Date,
    type: String,
    parent:String,
})

module.exports = mongoose.model('TinTuc', TinTucSchema);