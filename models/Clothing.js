const mongoose = require('mongoose');

const clothingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
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
        type: Number,
        required: true
    },
    materials: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    }
});

const Clothing = mongoose.model('Clothing', clothingSchema);

module.exports = Clothing;