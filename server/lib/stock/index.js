'use strict';

const models = require('../../models');
const Stock = models.Stock;
const mongoose = require('mongoose');

const fetchAllUserStock = async (user) => {

    const stock = await Stock.find({
            owner: user.id
        })
        .populate('initialStock')
        .populate('cropCategory')
        .exec();

    return stock;

}

const fetchAllCrops = async (categories) => {

    // Extract category ids
    const categoryIds = categories.map(category => new mongoose.Types.ObjectId(category._id));

    if (categoryIds.length) {
        // When category ids are present
        const stock = await Stock.find({
                type: 'crop',
                cropCategory: {
                    "$in": categoryIds
                }
            })
            .populate('cropCategory')
            .populate({
                path: 'owner',
                select: '_id firstName lastName userType address city state'
            })
            .exec();

        return stock;
    } else {
        // When category ids are absent
        const stock = await Stock.find({
                type: 'crop'
            })
            .populate('cropCategory')
            .populate({
                path: 'owner',
                select: '_id firstName lastName userType address city state'
            })
            .exec();

        return stock;
    }


}

const trackback = async (stockId, user) => {

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

const fetchPhoto = async (user, stockId) => {
    const stock = await Stock.findOne({
            _id: stockId,
            owner: user.id
        }, {
            imageName: true,
            imageMimeType: true
        })
        .exec();
    return stock;

}

module.exports = {
    fetch: {
        all: fetchAllUserStock,
        allCrops: fetchAllCrops,
        photo: fetchPhoto
    },
    trackback: trackback
}