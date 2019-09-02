'use strict';

var lib = require('../../lib');

/* Controller to get crop variety */
var fetchVariety = async (req, res, next) => {

    try {

        let cropName = req.params.cropName;

        let cropDetails = {
            cropName: cropName
        };

        let varieties = await lib.crop.fetch.variety(cropDetails);

        return res.json({
            success: true,
            payload: {
                varieties: varieties
            }
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = fetchVariety;