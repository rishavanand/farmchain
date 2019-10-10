'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to fetch crop details */
var fetchDetails = async (user, crop) => {

    let Crop = models.Crop;

    if(crop.id){

        var crop = await Crop.findOne({
            owner: mongoose.Types.ObjectId(user._id),
            _id: mongoose.Types.ObjectId(crop.id)
        }, {
            _id: 0,
            __v: 0
        }).exec()

    }else{

        //var user = 
        var crop = await Crop.find({
            owner: mongoose.Types.ObjectId(user._id)
        }, {
            __v: 0
        }).exec()

    }

    
    return crop;

}

module.exports = fetchDetails;