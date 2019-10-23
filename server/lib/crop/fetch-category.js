'use strict';

var models = require('../../models');
let Crop = models.Crop;

/* Function to fetch crop categories */
var fetchCategory = async () => {

    var categories = await Crop.find().exec();

    return categories;

}

module.exports = fetchCategory;