'use strict';

var mongoose = require('mongoose');
const mongoUrl = global.gConfig.mongoUrl;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoUrl);

var schema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true
    },
    initialStock: {
        type: mongoose.Schema.Types.ObjectId
    },
    lastStockType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    quantity: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number
    },
    resale: {
        type: Boolean,
        required: true
    },
    lastResale: {
        type: Boolean,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    imageMimeType: {
        type: String,
        required: true
    }
});

var Order = mongoose.model('Order', schema);

module.exports = Order;