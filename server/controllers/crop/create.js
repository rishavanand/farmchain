'use strict';

var lib = require('../../lib');

/* Controller to create new crop */
var create = async (req, res, next) => {

    try{

        let decoded = req.decoded;
        const user = req.user;

        let cropDetails = {
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            grade: req.body.grade,
            variety: req.body.variety,
            ownerMobileNumber: decoded.mobileNumber,
            imageName: req.file.filename,
            imageMimeType: req.file.mimetype,
            _id: decoded.id
        };

        await lib.crop.create(user, cropDetails);

        return res.json({
            success: true
        });

    }catch(err){
        return next(err);
    }

}

module.exports = create;