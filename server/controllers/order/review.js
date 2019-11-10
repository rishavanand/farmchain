'use strict';

const lib = require('../../lib');

const addReview = async (req, res, next) => {
    try{
        const orderId = req.body.orderId;
        const stars = req.body.stars;
        const buyer = req.user;

        // Stars validation
        if(!stars || stars < 0 || stars > 5)
            throw new Error('Invalid review stars');

        await lib.review.add(buyer, orderId, stars);

        return res.json({
            success: true
        });

    }catch(err){
        return next(err);
    }
}

module.exports = {
    add: addReview
};