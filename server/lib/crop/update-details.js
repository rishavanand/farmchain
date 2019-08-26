'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to update crop details */
var updateDetails = async (cropDetails) => {

    let Crop = models.Crop;
    let mobileNumber = cropDetails.mobileNumber;
    let cropId = cropDetails.cropId;

    let updatables = {
        name: cropDetails.name,
        price: cropDetails.price,
        quantity: cropDetails.quantity,
        variety: cropDetails.variety,
        grade: cropDetails.grade
    };

    let keys = Object.keys(updatables);
    keys.map((key) => {
        if (!updatables[key]) {
            Reflect.deleteProperty(updatables, key);
        }
    });

    await Crop.updateOne({
        owner: mobileNumber,
        _id: mongoose.Types.ObjectId(cropId)
    }, updatables).exec();

}

module.exports = updateDetails;