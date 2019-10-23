'use strict';

var lib = require('../../lib');

/* Controller to get crop categories */
var fetchCategory = async (req, res, next) => {

    try {

        const category = await lib.crop.fetch.category();

        return res.json({
            success: true,
            payload: {
                category: category
            }
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = fetchCategory;