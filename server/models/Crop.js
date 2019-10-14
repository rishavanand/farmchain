'use strict';

var mongoose = require('mongoose');
const mongoUrl = global.gConfig.mongoUrl;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoUrl);

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    variety: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateAdded: {
        type: Date,
        required: true,
        default: new Date()
    },
    photoPath: {
        type: String
    },
    photoName: {
        type: String
    },
    photoMimeType: {
        type: String
    }

});

var Crop = mongoose.model('Crop', schema);

module.exports = Crop;