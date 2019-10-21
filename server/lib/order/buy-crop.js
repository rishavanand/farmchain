'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to check of crops are in stock */
const checkStock = async (cropId, quantity) => {

    let Stock = models.Stock;
    var stock = await Stock.findOne({
        _id: mongoose.Types.ObjectId(cropId)
    }).exec();

    if (!stock)
        throw new Error('Crop not found');

    if (stock.quantity < quantity)
        throw new Error('Insufficient quantity');

    return stock;

};

/* Function to check if wholesaler has wallet balance */
const reduceBalance = async (cropId, buyerId, quantity) => {

    const Stock = models.Stock;
    const stock = await Stock.findOne({
        _id: mongoose.Types.ObjectId(cropId)
    }, {
        _id: 0,
        __v: 0
    }).exec()

    if (!stock)
        throw new Error('Crop not found');

    const cropPrice = stock.sellingPrice;
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
    let Stock = models.Stock;
    let buyer = cropDetails.buyer;
    const User = models.User;

    // Check if user has updated his profile
    let userSearchResult = await User.findOne({
        _id: new mongoose.Types.ObjectId(buyer.id)
    }).exec();

    if(!userSearchResult.address || !userSearchResult.city || !userSearchResult.state || !userSearchResult.firstName || !userSearchResult.lastName)
        throw new Error('Profile not completed.');

    const stock = await checkStock(cropDetails.id, cropDetails.quantity);
    await reduceBalance(cropDetails.id, buyer._id, cropDetails.quantity);

    if(stock.initialStock)
        var initialStock = new mongoose.Types.ObjectId(order.initialStock)
    else
        var initialStock = new mongoose.Types.ObjectId(cropDetails.id)

    // Create order
    let order = new Order({
        stock: new mongoose.Types.ObjectId(cropDetails.id),
        quantity: cropDetails.quantity,
        sellingPrice: cropDetails.newPrice,
        buyer: new mongoose.Types.ObjectId(buyer._id),
        resale: cropDetails.resale,
        lastStockType: stock.type,
        lastResale: stock.resale,
        imageName: stock.imageName,
        imageMimeType: stock.imageMimeType,
        initialStock: initialStock
    });

    await order.save();

    // Reduce crop amount
    const updatables = {
        $inc: {
            'quantity': -1 * parseFloat(cropDetails.quantity)
        }
    };
    await Stock.updateOne({
        _id: mongoose.Types.ObjectId(cropDetails.id)
    }, updatables).exec();

}

module.exports = buyCrop;