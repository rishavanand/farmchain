'use strict';

var User = require('../../models/User');

/* Function to verify an user */
var verify = async (userDetails) => {

    let user = await User.findOne({
        mobileNumber: userDetails.mobileNumber
    }).exec();

    if(user.verified === true)
        throw new Error('Mobile number already verified');

    let otp = user.otp;
    if (otp !== userDetails.otp)
        throw new Error('Invalid OTP');

    await User.updateOne({
        mobileNumber: userDetails.mobileNumber
    }, {
        verified: true
    }).exec();

}

module.exports = verify;