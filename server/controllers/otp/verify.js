'use strict';

var lib = require('../../lib');

/* Controller to verify user mobile number */
var verify = async (req, res, next) => {

    try {
        
        let userDetails = {
            mobileNumber: req.body.mobileNumber,
            otp: req.body.otp
        };

        await lib.otp.verify(userDetails);

        return res.json({
            success: true
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = verify;