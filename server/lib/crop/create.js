'use strict';

var models = require('../../models');

/* Function to create new crop */
var create = async (cropDetails) => {

    let Crop = models.Crop;

    let crop = new Crop({
        name: cropDetails.name,
        quantity: cropDetails.quantity,
        price: cropDetails.price,
        grade: cropDetails.grade,
        variety: cropDetails.variety,
        owner: cropDetails.ownerMobileNumber
    });

    await crop.save();

}

module.exports = create;