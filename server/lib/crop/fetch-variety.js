'use strict';

var models = require('../../models');

/* Function to fetch crop variety */
var fetchVariety = async (cropDetails) => {

    let Crop = models.Crop;
    let cropName = cropDetails.cropName;

    var variety = await Crop.find({
        name: cropName
    }).distinct('variety').exec();

    return variety;

}

module.exports = fetchVariety;