'use strict';

var models = require('../../models');

/* Function to fetch filtered crop list */
var fetchFiltered = async (stockDetails) => {

    let Stock = models.Stock;
    let cropName = stockDetails.cropName;
    let varietyName = stockDetails.varietyName;
    let gradeName = stockDetails.gradeName;

    var stock = await Stock.find({
            "type": "crop",
            "details": {
                "name": cropName,
                "grade": gradeName,
                "variety": varietyName
            }
        }).populate({
            path: 'owner',
            select: '_id firstName lastName userType address farmCity farmState'
        })
        .exec();

    return stock;

}

module.exports = fetchFiltered;