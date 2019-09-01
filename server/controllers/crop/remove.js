'use strict';

var lib = require('../../lib');

/* Controller to remove crop */
var removeCrop = async (req, res, next) => {

    try {

        let decoded = req.decoded;
        let cropId = req.params.cropId;

        let cropDetails = {
            mobileNumber: decoded.mobileNumber,
            cropId: cropId
        };

        await lib.crop.remove(cropDetails);

        return res.json({
            success: true
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = removeCrop;