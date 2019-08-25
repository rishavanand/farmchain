'use strict';

var lib = require('../../lib');

/* Controller to update user profile */
var updateProfile = async (req, res, next) => {

    try {

        let decoded = req.decoded;

        let userDetails = {
            mobileNumber: decoded.mobileNumber,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            farmCity: req.body.farmCity,
            farmState: req.body.farmState,
            shopCity: req.body.shopCity,
            shopState: req.body.shopState,
            address: req.body.address
        };

        await lib.user.update.profile(userDetails);

        return res.json({
            success: true
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = updateProfile;