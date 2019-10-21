'use strict';

var models = require('../../models');

/* Function to fetch crop grade */
var fetchGrade = async (cropDetails) => {

    let cropName = cropDetails.cropName;
    let varietyName = cropDetails.varietyName;
    let Stock = models.Stock;


    var grades = await Stock.find({
            "type": "crop",
            "details.name": cropName,
            "details.variety": varietyName
        }).distinct('details.grade')
        .exec();

    return grades;

}

module.exports = fetchGrade;