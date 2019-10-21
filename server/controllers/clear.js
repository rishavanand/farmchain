'use strict';

var lib = require('../lib');

var remove = async (req, res, next) => {

    try{

        await lib.clear();

        return res.json({
            success: true
        });

    }catch(err){
        return next(err);
    }

}

module.exports = remove;