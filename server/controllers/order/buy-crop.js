'use strict';

var lib = require('../../lib');

/* Controller to purchase crop */
var buyCrop = async (req, res, next) => {

    try {

        let decoded = req.decoded;
        let cropId = req.params.cropId;
        let quantity = req.body.quantity;
        let newPrice = req.body.newPrice;

        let cropDetails = {
            mobileNumber: decoded.mobileNumber,
            cropId: cropId,
            quantity: quantity,
            newPrice: newPrice
        };

        let transaction = await lib.order.buy.crop(cropDetails);

        return res.json({
            success: true,
            payload: {
                transaction: transaction
            }
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = buyCrop;