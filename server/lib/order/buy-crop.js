'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to check of crops are in stock */
const checkStock = async (cropId, quantity) => {

    let Crop = models.Crop;
    var crop = await Crop.findOne({
        _id: mongoose.Types.ObjectId(cropId)
    }, {
        _id: 0,
        __v: 0
    }).exec()

    if (!crop)
        throw new Error('Crop not found');

    if (crop.quantity < quantity)
        throw new Error('Insufficient quantity');

};

/* Function to check if wholesaler has wallet balance */
const reduceBalance = async (cropId, buyerId, quantity) => {

    const Crop = models.Crop;
    const crop = await Crop.findOne({
        _id: mongoose.Types.ObjectId(cropId)
    }, {
        _id: 0,
        __v: 0
    }).exec()

    if (!crop)
        throw new Error('Crop not found');

    const cropPrice = crop.price;
    const totalAmount = cropPrice * quantity;

    // Get user
    const User = models.User;
    const user = await User.findOne({
        _id: mongoose.Types.ObjectId(buyerId)
    });

    // Check balance
    if (!user.walletBalance || user.walletBalance < totalAmount)
        throw new Error('Insufficient balance');

    // Reduce balance
    await User.updateOne({
        _id: mongoose.Types.ObjectId(buyerId)
    }, {$inc: {'walletBalance': -1 * totalAmount}}).exec();

    return totalAmount;

};

/* Function for wholesalers to buy crops */
var buyCrop = async (cropDetails) => {

    let Order = models.Order;
    let Crop = models.Crop;
    let buyer = cropDetails.buyer;

    await checkStock(cropDetails.id, cropDetails.quantity);
    const totalAmount = await reduceBalance(cropDetails.id, buyer._id, cropDetails.quantity);

    // Create order
    let order = new Order({
        cropId: new mongoose.Types.ObjectId(cropDetails.id),
        quantity: cropDetails.quantity,
        newPrice: cropDetails.newPrice,
        buyerId: new mongoose.Types.ObjectId(buyer._id),
        cost: totalAmount
    });

    await order.save();

    // Reduce crop amount
    const updatables = {
        $inc: {
            'quantity': -1 * parseFloat(cropDetails.quantity)
        }
    };
    await Crop.updateOne({
        _id: mongoose.Types.ObjectId(cropDetails.id)
    }, updatables).exec();

}

module.exports = buyCrop;