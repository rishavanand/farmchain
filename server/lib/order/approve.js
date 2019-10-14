'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function for approve orders */
var approve = async (user, orderDetails) => {

    const Order = models.Order;
    const User = models.User;

    // Check order exists
    const order = await Order.findOne({
        buyerId: mongoose.Types.ObjectId(user._id),
        _id: mongoose.Types.ObjectId(orderDetails.id)
    }, {
        __v: 0
    }).exec()

    if (!order)
        throw new Error('Order not found');

    if (order.status != 'pending')
        throw new Error('Only pending orders can be approved');

    // Increment sellers balance
    const cost = order.cost;
    await User.updateOne({
        sellerId: mongoose.Types.ObjectId(order.sellerId)
    }, {
        $inc: {
            walletBalnce: cost
        }
    }).exec()

    // Change order status
    await Order.updateOne({
        buyerId: mongoose.Types.ObjectId(user._id),
        _id: mongoose.Types.ObjectId(orderDetails.id)
    }, {
        status: 'completed'
    }).exec()

}

module.exports = approve;