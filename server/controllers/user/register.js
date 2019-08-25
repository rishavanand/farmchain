'use strict';

var lib = require('../../lib');

/* Controller for registering new user */
var register = async (req, res, next) => {

    try {
        
        let userDetails = {
            mobileNumber: req.body.mobileNumber,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            userType: req.body.userType
        };

        await lib.user.register(userDetails);

        return res.json({
            success: true
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = register;