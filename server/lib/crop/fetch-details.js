'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to fetch crop details */
var fetchDetails = async (stock) => {

    let Stock = models.Stock;
    let res = [];

    if (stock.id) {
        
        res = await Stock.findOne({
            type: 'crop',
            _id: mongoose.Types.ObjectId(stock.id)
        }, {
            _id: 0,
            __v: 0
        }).exec()

    } else {

        res = await Stock.find({
                type: 'crop'
            })
            .populate('cropCategory')
            .populate({
                path: 'owner',
                select: '_id firstName lastName userType address farmCity farmState'
            })
            .exec()
    }


    return res;

}

module.exports = fetchDetails;