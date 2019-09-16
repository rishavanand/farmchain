'use strict';

var mongoose = require('mongoose');
const mongoosePort = process.env.MONGO_HOST || "127.0.0.1";

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb+srv://farmchain:ycoZ6CVCWpVut70m@cluster0-llvxe.mongodb.net/famrchain?retryWrites=true&w=majority`);

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