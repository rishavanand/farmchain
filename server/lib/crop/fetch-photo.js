'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to fetch crop photo */
var fetchPhoto = async (cropDetails) => {

    let Crop = models.Crop;
    let owner = cropDetails.owner;

    let crop = await Crop.findOne({
        owner: owner._id,
        _id: mongoose.Types.ObjectId(cropDetails.cropId)
    }, {
        photoPath: 1,
        photoMimeType: 1
    }).exec()

    return [
        crop.photoPath,
        crop.photoMimeType
    ];

}

module.exports = fetchPhoto;