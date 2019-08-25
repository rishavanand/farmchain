'use strict';

var lib = require('../../lib');

/* Controller to update user login password */
var changePassword = async (req, res, next) => {

    try {
        
        let decoded = req.decoded;

        var oldPassword = req.body.oldPassword;
        var newPassword = req.body.newPassword;

        if(!oldPassword)
            throw new Error('Please provide old password');

        if(!newPassword)
            throw new Error('Please provide new password');

        let userDetails = {
            mobileNumber: decoded.mobileNumber,
            oldPassword: req.body.oldPassword,
            newPassword: req.body.newPassword
        };
        
        await lib.user.update.password(userDetails);

        return res.json({
            success: true
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = changePassword;