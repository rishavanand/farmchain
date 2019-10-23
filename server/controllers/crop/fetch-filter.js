'use strict';

var lib = require('../../lib');

/* Controller to get crop categories */
var fetchCategory = async (req, res, next) => {

    try {

        const filters = req.query;
        const name = filters.name;
        const variety = filters.variety;

        if(name && variety){
            const grades = await lib.crop.fetch.filter.grades(filters);
            return res.json({
                success: true,
                payload: {
                    grades: grades
                }
            });
        }else if(name){
            const varieties = await lib.crop.fetch.filter.varieties(filters);
            return res.json({
                success: true,
                payload: {
                    varieties: varieties
                }
            });
        }else{
            throw new Error('Insufficient filter data');
        }

    } catch (err) {
        return next(err);
    }

}

module.exports = fetchCategory;