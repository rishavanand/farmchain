'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to create new crop */
var create = async (user, cropDetails) => {

    const Stock = models.Stock;
    const User = models.User;

    let userSearchResult = await User.findOne({
        _id: new mongoose.Types.ObjectId(user.id)
    }).exec();

    if(!userSearchResult.address || !userSearchResult.city || !userSearchResult.state || !userSearchResult.firstName || !userSearchResult.lastName || !userSearchResult.address)
        throw new Error('Profile not completed.');

    let stock = new Stock({
        type: 'crop',
        details: {
            name: cropDetails.name,
            grade: cropDetails.grade,
            variety: cropDetails.variety
        },
        quantity: cropDetails.quantity,
        sellingPrice: cropDetails.price,
        owner: new mongoose.Types.ObjectId(user.id),
        imageName: cropDetails.imageName,
        imageMimeType: cropDetails.imageMimeType
    });

    await stock.save();

}

module.exports = create;