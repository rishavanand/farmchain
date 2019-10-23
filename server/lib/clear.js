'use strict';

var models = require('../models');

var remove = async () => {

    let Stock = models.Stock;
    let Order = models.Order;
    let Crop = models.Crop;

    await Stock.find().remove()
        .exec();
    await Order.find().remove()
        .exec();
    await Crop.find().remove()
        .exec();

}

module.exports = remove;