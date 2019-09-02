'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to buyCrop */
var buyCrop = async (cropDetails) => {

    let Crop = models.Crop;

    let crop = new Crop({
        name: cropDetails.name,
        quantity: cropDetails.quantity,
        price: cropDetails.price,
        grade: cropDetails.grade,
        variety: cropDetails.variety,
        owner: new mongoose.Types.ObjectId(cropDetails._id)
    });

    await crop.save();

}

module.exports = buyCrop;