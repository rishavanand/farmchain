'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to fetch crop details */
var fetchDetails = async (cropDetails) => {

    let Crop = models.Crop;

    let mobileNumber = cropDetails.mobileNumber;
    let cropId = cropDetails.cropId;

    if(cropId){

        var crop = await Crop.findOne({
            owner: mobileNumber,
            _id: mongoose.Types.ObjectId(cropId)
        }, {
            _id: 0,
            __v: 0
        }).exec()

    }else{

        var crop = await Crop.find({
            owner: mobileNumber,
        }, {
            __v: 0
        }).exec()

    }

    
    return crop;

}

module.exports = fetchDetails;