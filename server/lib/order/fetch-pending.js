'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function for get list of orders */
var fetchCount = async (user) => {

    let Order = models.Order;

    var orders = await Order.find({
            '$or': [
                {
                    buyer: mongoose.Types.ObjectId(user._id)
                },
                {
                    seller: mongoose.Types.ObjectId(user._id)
                }
            ],
            'status': 'pending'
        })
        .exec()

    return orders.length;

}

module.exports = fetchCount;