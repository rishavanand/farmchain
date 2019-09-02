'use strict';

var lib = require('../../lib');

/* Controller to get crop grade */
var fetchGrade = async (req, res, next) => {

    try {

        let cropName = req.params.cropName;
        let varietyName = req.params.varietyName;

        let cropDetails = {
            cropName: cropName,
            varietyName: varietyName
        };

        let grades = await lib.crop.fetch.grade(cropDetails);

        return res.json({
            success: true,
            payload: {
                grades: grades
            }
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = fetchGrade;