'use strict';

var models = require('../models');

var remove = async () => {

    let Stock = models.Stock;
    let Order = models.Order;
    await Stock.find().remove()
        .exec();
    await Order.find().remove()
        .exec();

}

module.exports = remove;