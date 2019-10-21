'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function for approve orders */
var approve = async (user, orderDetails) => {

    const Order = models.Order;
    const User = models.User;
    const Stock = models.Stock;

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
    const cost = order.stock.sellingPrice;
    await User.updateOne({
        sellerId: mongoose.Types.ObjectId(order.sellerId)
    }, {
        $inc: {
            walletBalnce: cost
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

        if(order.lastStockType == 'crop'){
            // When stock bought is a crop

            const newStockType = 'wholesaler-product';
            let newStock = new Stock({
                lastStock: lastStockId,
                type: newStockType,
                quantity: newStockQuantity,
                sellingPrice: newStockSellingPrice,
                owner: new mongoose.Types.ObjectId(user.id),
                imageName: lastStockImageName,
                imageMimeType: lastImageMimeType,
                resale: order.resale,
                initialStock: order.initialStock
            });
        
            await newStock.save();
            
        }
    }

    // Change order status
    await Order.updateOne({
        buyer: mongoose.Types.ObjectId(user._id),
        _id: mongoose.Types.ObjectId(orderDetails.id)
    }, {
        status: 'completed'
    }).exec()

}

module.exports = approve;