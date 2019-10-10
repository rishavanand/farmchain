'use strict';

var lib = require('../../lib');

/* Controller to login user */
var login = async (req, res, next) => {

    try {
        
        let userDetails = {
            mobileNumber: req.body.mobileNumber,
            password: req.body.password
        };
        
        let token = await lib.user.login(userDetails);

        return res.json({
            success: true,
            payload: {
                token: token
            }
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = login;