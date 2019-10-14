'use strict';

var mongoose = require('mongoose');
const mongoUrl = global.gConfig.mongoUrl;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoUrl);

var schema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cropId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crop',
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
    newPrice: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});

var Order = mongoose.model('Order', schema);

module.exports = Order;