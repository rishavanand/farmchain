'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to fetch crop names */
var fetchNames = async () => {

    let Crop = models.Crop;

    var crop = await Crop.find().distinct('name').exec();

    return crop;

}

module.exports = fetchNames;