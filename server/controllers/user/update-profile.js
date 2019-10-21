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
            city: req.body.city,
            state: req.body.state,
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