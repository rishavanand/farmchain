'use strict';

const models = require('../../models');

const fetchAllUserStock = async (user) => {

    const Stock = models.Stock;

    const stock = await Stock.find({
            owner: user.id
        }).populate('initialStock')
        .exec();

    return stock;

}

const trackback = async (stockId, user) => {

    const Stock = models.Stock;
    let stock = await Stock.findOne({
            owner: user.id,
            _id: stockId
        })
        .populate({
            path: 'owner',
            select: '_id firstName lastName userType address city state'
        })
        .exec();

    if (!stock)
        throw new Error('Stock not found');

    const stocks = [stock];

    while (true) {
        if (!stock.lastStock || stock.lastStock == stock._id)
            break;
        stock = await getStock(stock.lastStock);
        stocks.push(stock);
    }
    
    return stocks;

}

const getStock = async (stockId) => {

    const Stock = models.Stock;
    const stock = await Stock.findOne({
            _id: stockId
        })
        .populate({
            path: 'owner',
            select: '_id firstName lastName userType address city state'
        })
        .exec();
    return stock;

}

module.exports = {
    fetch: {
        all: fetchAllUserStock
    },
    trackback: trackback
}