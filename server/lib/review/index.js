'use strict';

const models = require('../../models');
const blockchain = require('../blockchain');
const mongoose = require('mongoose');

const addReview = async (user, orderId, stars) => {

    // Check if already given
    const order = await models.Order.findOne({
        _id: mongoose.Types.ObjectId(orderId)
    });
    if (order.review === true)
        throw new Error('Review already submitted');

    // Check if user can review
    if (order.status !== 'completed')
        throw new Error('Order not completed');

    if (order.buyer != user.id)
        throw new Error('User not allowed to give review for this order');

    // Add review to blockchain
    blockchain.newTransaction({
        type: 'review',
        sellerId: order.seller,
        buyerId: order.buyer,
        stars: stars,
        timestamp: new Date()
    });

    // Change review status
    await models.Order.update({
        _id: mongoose.Types.ObjectId(orderId)
    }, {
        $set: {
            review: true
        }
    }).exec();

}

module.exports = {
    add: addReview
};