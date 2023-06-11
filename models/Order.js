const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true 
    },
    productIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clothing',
        required: true
    }],
    orderNumber: {
        type: Number,
        required: true
    },
    clientNumber:{
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'confirmed'],
        default: 'processing',
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
