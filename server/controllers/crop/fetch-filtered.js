'use strict';

var lib = require('../../lib');

/* Controller to get filtered crop list */
var fetchFiltered = async (req, res, next) => {

    try {

        let cropName = req.params.cropName;
        let varietyName = req.params.varietyName;
        let gradeName = req.params.gradeName;

        let cropDetails = {
            cropName: cropName,
            varietyName: varietyName,
            gradeName: gradeName
        };

        let crops = await lib.crop.fetch.filtered(cropDetails);

        return res.json({
            success: true,
            payload: {
                crops: crops
            }
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = fetchFiltered;