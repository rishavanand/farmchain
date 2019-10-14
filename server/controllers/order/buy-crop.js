'use strict';

var lib = require('../../lib');

/* Controller to purchase crop */
var buyCrop = async (req, res, next) => {

    try {

        let decoded = req.decoded;
        let cropId = req.body.id;
        let quantity = req.body.quantity;
        let newPrice = req.body.newPrice;
        let user = req.user;

        let cropDetails = {
            mobileNumber: decoded.mobileNumber,
            id: cropId,
            quantity: quantity,
            newPrice: newPrice,
            buyer: user
        };

        await lib.order.buy.crop(cropDetails);

        return res.json({
            success: true
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = buyCrop;