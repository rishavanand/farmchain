'use strict';

var models = require('../../models');
var mongoose = require('mongoose');
const Order = models.Order;
const Stock = models.Stock;
const User = models.User;

/* Function to check of crops are in stock */
const checkStock = async (cropId, quantity) => {

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

/* Check id user profile is complete */
const checkProfileStatus = async (user) => {

    let userSearchResult = await User.findOne({
        _id: new mongoose.Types.ObjectId(user.id)
    }).exec();

    if(!userSearchResult.address || !userSearchResult.city || !userSearchResult.state || !userSearchResult.firstName || !userSearchResult.lastName)
        throw new Error('Profile not completed.');

}

const checkPurchasable = (buyer, product) => {

    const buyerUserType = buyer.userType;
    const productType = product.type;

    if(buyerUserType == 'wholesaler' && productType == 'crop')
        return;
    else
        throw new Error('Product purchase not allowed');

}

/* Function for wholesalers to buy products */
var buyCrop = async (productDetails) => {

    const buyer = productDetails.buyer;
    await checkProfileStatus(buyer);

    // Check stock
    const stock = await checkStock(productDetails.id, productDetails.quantity);

    // Check if product is purchasable by user
    await checkPurchasable(buyer, stock);

    // Check and reduce balance
    await reduceBalance(productDetails.id, buyer._id, productDetails.quantity);

    let initialStock = null;
    if(stock.initialStock)
        initialStock = new mongoose.Types.ObjectId(order.initialStock)
    else
        initialStock = new mongoose.Types.ObjectId(productDetails.id)

    // Create order
    let order = new Order({
        stock: new mongoose.Types.ObjectId(productDetails.id),
        quantity: productDetails.quantity,
        sellingPrice: productDetails.newPrice,
        buyer: new mongoose.Types.ObjectId(buyer._id),
        seller: new mongoose.Types.ObjectId(stock.owner),
        cropCategory: new mongoose.Types.ObjectId(stock.cropCategory),
        resale: productDetails.resale,
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
            'quantity': -1 * parseFloat(productDetails.quantity)
        }
    };
    await Stock.updateOne({
        _id: mongoose.Types.ObjectId(productDetails.id)
    }, updatables).exec();

}

module.exports = buyCrop;