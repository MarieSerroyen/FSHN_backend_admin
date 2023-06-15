const mongoose = require('mongoose');

const clothingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    articleNumber: {
        type: String,
        required: true
    },
    headImage: {
        type: String,
        required: true
    },
    modelImage: {
        type: String,
        required: true
    },
    modelImage2: {
        type: String,
        required: true
    },
    sizes: {
        type: Array,
        required: true
    },
    colors: {
        type: Array,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    materials: {
        type: Array,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    }],
    collectionStore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        required: false
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    },
    verticalOffset: {
        type: Number,
        required: false
    },
    horizontalOffset: {
        type: Number,
        required: false
    },
    mappingImage: {
        type: String,
        required: false
    },
    clothingType: {
        type: String,
        required: false,
        enum: ['top', 'bottom'],
        default: 'top'
    },
});

const Clothing = mongoose.model('Clothing', clothingSchema);

module.exports = Clothing;