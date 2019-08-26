'use strict';

var mongoose = require('mongoose');
const mongoosePort = process.env.MONGO_HOST || "127.0.0.1";

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://${mongoosePort}/farmchain`);

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
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
        type: String,
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