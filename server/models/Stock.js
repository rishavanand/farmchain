'use strict';

var mongoose = require('mongoose');
const mongoUrl = global.gConfig.mongoUrl;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoUrl);

var schema = new mongoose.Schema({
    lastStock: {
        type: mongoose.Schema.Types.ObjectId
    },
    initialStock: {
        type: mongoose.Schema.Types.ObjectId
    },
    resale: {
        type: String,
        required: true,
        default: true
    },
    type: {
        type: String,
        required: true
    },
    cropCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crop'
    },
    costPrice: {
        type: String,
        required: false
    },
    sellingPrice: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: new Date()
    },
    quantity: {
        type: Number,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    imageMimeType: {
        type: String,
        required: true
    },
    lastTrackingId: {
        type: String
    },
    trackingId: {
        type: String,
        required: true
    }
    // variety: {
    //     type: String,
    //     required: true
    // },
    // grade: {
    //     type: String,
    //     required: true
    // },
    // photoPath: {
    //     type: String
    // },
    // photoName: {
    //     type: String
    // },
    // photoMimeType: {
    //     type: String
    // }

});

var stock = mongoose.model('Stock', schema);

module.exports = stock;