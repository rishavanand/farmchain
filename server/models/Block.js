'use strict';

var mongoose = require('mongoose');
const mongoUrl = global.gConfig.mongoUrl;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoUrl);

var schema = new mongoose.Schema({
    blockList: {
        type: mongoose.SchemaTypes.Mixed,
        required: true
    }
});

var Block = mongoose.model('Block', schema);

module.exports = Block;