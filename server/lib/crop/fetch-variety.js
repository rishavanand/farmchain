'use strict';

var models = require('../../models');

/* Function to fetch crop variety */
var fetchVariety = async (cropDetails) => {

    let Stock = models.Stock;
    let cropName = cropDetails.cropName;

    var variety = await Stock.find({
            "type": "crop",
            "details.name": cropName
        }).distinct('details.variety')
        .exec();

    return variety;

}

module.exports = fetchVariety;