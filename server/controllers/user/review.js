'use strict';

const lib = require('../../lib');

const review = async (req, res, next) => {
    try{

        const userId = req.params.userId;

        const review = await lib.user.fetch.review(userId);

        return res.json({
            success: true,
            payload: {
                review: review
            }
        });

    }catch(err){
        return next(err);
    }
}

module.exports = review;