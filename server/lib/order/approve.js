'use strict';

const models = require('../../models');
const mongoose = require('mongoose');
const randomatic = require('randomatic');
const blockchain = require('../blockchain');

// Get public details of a user
const getUser = async (id) => {
    const user = await models.User.findOne({
        _id: mongoose.Types.ObjectId(id)
    }, {
        firstName: 1,
        lastName: 1,
        city: 1,
        state: 1,
        address: 1,
        userType: 1

    }).exec();
    
    if(!user)
        throw new Error('User not found');

    return user;
}

// Get stock details
const getStock = async (id) => {
    const stock = await models.Stock.findOne({
        _id: mongoose.Types.ObjectId(id)
    }).exec();
 
    if(!stock)
        throw new Error('Stock not found');

    return stock;
}

// Get crop
const getCrop = async (id) => {
    const crop = await models.Crop.findOne({
        _id: mongoose.Types.ObjectId(id)
    }, {
        name: 1,
        variety: 1,
        grade: 1
    }).exec();
 
    if(!crop)
        throw new Error('Crop not found');

    return crop;
}

/* Function for approve orders */
const approve = async (user, orderDetails) => {

    const Order = models.Order;
    const User = models.User;
    const Stock = models.Stock;
    
    const newTrackingId = randomatic('Aa0', 10);

    // Check order exists
    const order = await Order.findOne({
        buyer: mongoose.Types.ObjectId(user._id),
        _id: mongoose.Types.ObjectId(orderDetails.id)
    }, {
        __v: 0
    }).exec()

    if (!order)
        throw new Error('Order not found');

    if (order.status != 'pending')
        throw new Error('Only pending orders can be approved');

    // Increment sellers balance
    const cost = order.sellingPrice;
    await User.updateOne({
        sellerId: mongoose.Types.ObjectId(order.seller)
    }, {
        $inc: {
            walletBalance: cost
        }
    }).exec()

    // Add to buyer's stock
    if(order.lastResale){
        // When marked for relsale

        const newStockSellingPrice = order.sellingPrice;
        const newStockQuantity = order.quantity;
        const lastStockId = order.stock;
        const lastStockImageName = order.imageName;
        const lastImageMimeType = order.imageMimeType;
        const cropCategory = order.cropCategory;
        const trackingId = order.trackingId;
        let newStockType = null;

        if(user.userType === 'wholesaler'){
            newStockType = 'wholesaler-product';
        }else if(user.userType === 'retailer'){
            newStockType = 'retailer-product';
        }else if(user.userType === 'consumer'){
            newStockType = 'consumer-good';
        }
        
        let newStock = new Stock({
            lastStock: lastStockId,
            type: newStockType,
            quantity: newStockQuantity,
            sellingPrice: newStockSellingPrice,
            owner: new mongoose.Types.ObjectId(user.id),
            imageName: lastStockImageName,
            imageMimeType: lastImageMimeType,
            resale: order.resale,
            initialStock: order.initialStock,
            cropCategory: cropCategory,
            lastTrackingId: trackingId,
            trackingId: newTrackingId
        });
    
        await newStock.save();
    }

    // Change order status
    await Order.updateOne({
        buyer: mongoose.Types.ObjectId(user._id),
        _id: mongoose.Types.ObjectId(orderDetails.id)
    }, {
        status: 'completed'
    }).exec()

    // Add transaction to blockchain
    const buyer = await getUser(user.id);
    const seller = await getUser(order.seller);
    const trackingId = order.trackingId;
    const stock = await getStock(order.stock);
    const crop = await getCrop(stock.cropCategory);
    blockchain.newTransaction({
        type: 'resale',
        crop: crop,
        quantity: order.quantity,
        resale: order.resale,
        purchaseRate: stock.sellingPrice,
        newRate: order.sellingPrice,
        buyer: buyer,
        seller: seller,
        trackingId: newTrackingId,
        lastTrackingId: trackingId,
        timestamp: new Date()
    });

}

module.exports = approve;