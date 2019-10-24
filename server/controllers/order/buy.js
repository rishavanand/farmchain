'use strict';

var lib = require('../../lib');

/* Controller to purchase product */
var buyProduct = async (req, res, next) => {

    try {

        const user = req.user;
        const userType = user.userType;

        let productDetails = {
            id: req.body.id,
            quantity: req.body.quantity,
            newPrice: req.body.newPrice,
            buyer: user,
            resale: req.body.resale
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