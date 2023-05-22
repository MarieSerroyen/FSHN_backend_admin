const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
