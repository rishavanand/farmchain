'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to update crop photo */
var updatePhoto = async (cropDetails) => {
    
    let Crop = models.Crop;
    let owner = cropDetails.owner;
    let cropId = cropDetails.cropId;

    await Crop.updateOne({
        owner: owner._id,
        _id: mongoose.Types.ObjectId(cropId)
    }, {
        photoPath: cropDetails.photoPath,
        photoName: cropDetails.photoName,
        photoMimeType: cropDetails.photoMimeType
    }).exec();

}

module.exports = updatePhoto;