'use strict';

var lib = require('../../lib');

/* Controller to get crop profile */
var fetchDetails = async (req, res, next) => {

    try {

        let decoded = req.decoded;
        let cropId = req.params.cropId;

        let cropDetails = {
            mobileNumber: decoded.mobileNumber,
            cropId: cropId
        };

        let details = await lib.crop.fetch.details(cropDetails);

        return res.json({
            success: true,
            payload: {
                details: details
            }
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = fetchDetails;