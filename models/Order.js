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
    clientNumber:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        default: 1,
        required: false
    },
    size: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
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
