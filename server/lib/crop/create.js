'use strict';

const models = require('../../models');
const mongoose = require('mongoose');
const cropCategoty = require('../crop/category');
const randomatic = require('randomatic');
const Stock = models.Stock;
const User = models.User;

/* Check if user profile is updated */
const checkUserProfileCompletionStatus = async (user) => {

    let userSearchResult = await User.findOne({
        _id: new mongoose.Types.ObjectId(user.id)
    }).exec();

    if (!userSearchResult.address || !userSearchResult.city || !userSearchResult.state || !userSearchResult.firstName || !userSearchResult.lastName || !userSearchResult.address)
        throw new Error('Profile not completed.');

} 

/* Function to create new crop */
const create = async (user, cropDetails) => {

    await checkUserProfileCompletionStatus(user);
    
    // Find or create a crop category
    const category = await cropCategoty.findOrCreate({
        name: cropDetails.name,
        grade: cropDetails.grade,
        variety: cropDetails.variety
    });
    
    // Create stock
    const trackingId = randomatic('Aa0', 10);
    const stock = new Stock({
        type: 'crop',
        cropCategory: new mongoose.Types.ObjectId(category._id),
        quantity: cropDetails.quantity,
        sellingPrice: cropDetails.price,
        owner: new mongoose.Types.ObjectId(user.id),
        imageName: cropDetails.imageName,
        imageMimeType: cropDetails.imageMimeType,
        trackingId: trackingId,
        lastTrackingId: null
    });
    await stock.save();

}

module.exports = create;