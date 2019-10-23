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
    variety: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    }
});

var Crop = mongoose.model('Crop', schema);

module.exports = Crop;