const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
