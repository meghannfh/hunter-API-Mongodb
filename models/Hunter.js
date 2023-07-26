const mongoose = require('mongoose');

const HunterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    birthName: {
        type: String,
        required: true,
        unique: true
    },
    birthDate: {
        type: String,
        required: false,
    },
    zodiac: [String],
    age: {
        type: String,
        required: false,
    },
    birthLocation: {
        type: String,
        required: false,
    },
    nenType: {
        type: String,
        required: false,
    },
    charImage: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Hunter', HunterSchema)