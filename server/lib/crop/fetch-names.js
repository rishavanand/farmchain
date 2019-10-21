'use strict';

var models = require('../../models');
var mongoose = require('mongoose');

/* Function to fetch crop names */
var fetchNames = async () => {

    let Stock = models.Stock;

    var names = await Stock.find().distinct('details.name')
        .exec();

    return names;

}

module.exports = fetchNames;