const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
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

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
