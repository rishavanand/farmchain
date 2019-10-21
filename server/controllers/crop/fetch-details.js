'use strict';

const lib = require('../../lib');

/* Controller to get crop profile */
var fetchDetails = async (req, res, next) => {

    try {

        const cropId = req.params.cropId;
        
        const crop = {
            id: cropId
        };

        const details = await lib.crop.fetch.details(crop);

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