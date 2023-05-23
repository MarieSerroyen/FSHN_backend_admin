const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true 
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clothing',
        required: true
    },
    amount: {
        type: Number,
        default: 1,
        required: true
    },
    orderNumber: {
        type: Number,
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
