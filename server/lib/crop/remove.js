'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to remove crop */
var removeCrop = async (cropDetails) => {

    let Crop = models.Crop;
    let mobileNumber = cropDetails.mobileNumber;
    let cropId = cropDetails.cropId;

    await Crop.deleteOne({
        owner: mobileNumber,
        _id: mongoose.Types.ObjectId(cropId)
    }).exec();

}

module.exports = removeCrop;