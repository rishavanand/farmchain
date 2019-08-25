'use strict';

var mongoose = require('mongoose');
const mongoosePort = process.env.MONGO_HOST || "127.0.0.1";

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://${mongoosePort}/farmchain`);

var schema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        required: true
    },
    photoPath: {
        type: String
    },
    photoName: {
        type: String
    },
    photoMimeType: {
        type: String
    },
    farmCity: {
        type: String
    },
    farmState: {
        type: String
    },
    shopCity: {
        type: String
    },
    shopState: {
        type: String
    },
    address: {
        type: String
    }

});

var User = mongoose.model('User', schema);

module.exports = User;