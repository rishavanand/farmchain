'use strict';

var lib = require('../../lib');

/* Controller to get user profile */
var login = async (req, res, next) => {

    try {

        let decoded = req.decoded;
        
        let userDetails = {
            mobileNumber: decoded.mobileNumber
        };

        let profile = await lib.user.fetch.profile(userDetails);

        return res.json({
            success: true,
            payload: {
                profile: profile
            }
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = login;