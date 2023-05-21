const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
