'use strict';

var mongoose = require('mongoose');
const mongoUrl = global.gConfig.mongoUrl;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//mongoose.connect(`mongodb://${mongoosePort}/farmchain`);
mongoose.connect(mongoUrl);

var schema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
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
    city: {
        type: String
    },
    state: {
        type: String
    },
    address: {
        type: String
    },
    walletBalance: {
        type: Number,
        default: 0
    }

});

var User = mongoose.model('User', schema);

module.exports = User;