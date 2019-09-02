'use strict';

var models = require('../../models');

/* Function to fetch filtered crop list */
var fetchFiltered = async (cropDetails) => {

    let Crop = models.Crop;
    let cropName = cropDetails.cropName;
    let varietyName = cropDetails.varietyName;
    let gradeName = cropDetails.gradeName;

    var crops = await Crop.find({
        name: cropName,
        variety: varietyName,
        grade: gradeName
    }, {__v: 0}).populate('owner').exec();

    crops = crops.map((crop) => {
        crop.owner.password = undefined;
        crop.owner.__v = undefined;
        crop.owner.otp = undefined;
        return crop;
    })

    return crops;

}

module.exports = fetchFiltered;