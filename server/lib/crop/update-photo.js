'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to update crop photo */
var updatePhoto = async (userDetails) => {
    
    let Crop = models.Crop;
    let mobileNumber = userDetails.mobileNumber;
    let cropId = userDetails.cropId;

    await Crop.updateOne({
        owner: mobileNumber,
        _id: mongoose.Types.ObjectId (cropId)
    }, {
        photoPath: userDetails.photoPath,
        photoName: userDetails.photoName,
        photoMimeType: userDetails.photoMimeType
    }).exec();

}

module.exports = updatePhoto;