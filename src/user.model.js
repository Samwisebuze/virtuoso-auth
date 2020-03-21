const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    username: { type: String, unique: true, required: true }, // really an email address
    hash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

schema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('User', schema)
