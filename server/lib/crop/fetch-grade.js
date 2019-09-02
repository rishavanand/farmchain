'use strict';

var models = require('../../models');

/* Function to fetch crop grade */
var fetchGrade = async (cropDetails) => {

    let Crop = models.Crop;
    let cropName = cropDetails.cropName;
    let varietyName = cropDetails.varietyName;

    var grades = await Crop.find({
        name: cropName,
        variety: varietyName
    }).distinct('grade').exec();

    return grades;

}

module.exports = fetchGrade;