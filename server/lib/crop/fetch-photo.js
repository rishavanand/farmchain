'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to fetch crop photo */
var fetchPhoto = async (cropDetails) => {

    let Stock = models.Stock;
    let owner = cropDetails.owner;

    let stock = await Stock.findOne({
        owner: owner._id,
        _id: mongoose.Types.ObjectId(cropDetails.cropId)
    }).exec()

    return [
        stock.imageName,
        stock.imageMimeType
    ];

}

module.exports = fetchPhoto;