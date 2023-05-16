const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
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
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
