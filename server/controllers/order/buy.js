'use strict';

var lib = require('../../lib');

/* Controller to purchase product */
var buyProduct = async (req, res, next) => {

    try {

        let productId = req.body.id;
        let quantity = req.body.quantity;
        let newPrice = req.body.newPrice;
        let user = req.user;
        const resale = req.body.resale;

        let productDetails = {
            id: productId,
            quantity: quantity,
            newPrice: newPrice,
            buyer: user,
            resale: resale
        };

        await lib.order.buy(productDetails);

        return res.json({
            success: true
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = buyProduct;