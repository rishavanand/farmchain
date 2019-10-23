'use strict';

const models = require('../../models');
const Stock = models.Stock;
const stock = require('../stock');
const cropCategory = require('../crop/category');

const fetchAll = async (user, filter) => {
    
    const userType = user.userType;

    if(userType == 'wholesaler'){
        const category = await cropCategory.getCropCategoryFromFilter(filter);
        const products = await stock.fetch.allCrops(category);
        return products;
    }

    return userType;
}

const fetchPhoto = async (productId) => {
    const product = await Stock.findOne({
            _id: productId
        }, {
            imageName: true,
            imageMimeType: true
        })
        .exec();
    return product;

}

module.exports = {
    fetch: {
        all: fetchAll,
        photo: fetchPhoto
    }
};