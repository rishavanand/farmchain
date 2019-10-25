'use strict';

const models = require('../../models');
const Stock = models.Stock;
const stock = require('../stock');
const cropCategory = require('../crop/category');

const fetchAll = async (user, filter) => {

    const userType = user.userType;
    
    if (userType === 'wholesaler') {
        const category = await cropCategory.getCropCategoryFromFilter(filter);
        const products = await stock.fetch.allCrops(category);
        return products;
    } else if (userType === 'retailer') {
        const products = await stock.fetch.allOthers([
            'wholesaler-product',
            'retailer-product'
        ]);
        return products;
    } else if (userType === 'consumer') {
        const products = await stock.fetch.allOthers(['retailer-product']);
        return products;
    }else {
        return [];
    }
    
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