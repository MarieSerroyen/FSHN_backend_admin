const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
