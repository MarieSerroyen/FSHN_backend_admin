const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo : {
        type: String,
        required: true
    },
    primaryColor: {
        type: String,
        required: true
    },
    secondaryColor: {
        type: String,
        required: false
    },
    slogan: {
        type: String,
        required: false
    }
});

const User = mongoose.model('Brand', brandSchema);

module.exports = Brand;
