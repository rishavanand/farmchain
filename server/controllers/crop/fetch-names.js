'use strict';

var lib = require('../../lib');

/* Controller to get crop names */
var fetchNames = async (req, res, next) => {

    try {

        let names = await lib.crop.fetch.names();

        return res.json({
            success: true,
            payload: {
                names: names
            }
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = fetchNames;