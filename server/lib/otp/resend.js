'use strict';

var User = require('../../models/User');
var generate = require('./generate');

/* Function to verify an user */
var resend = async (userDetails) => {

    let code = await generate(userDetails);

    await User.updateOne({
        mobileNumber: userDetails.mobileNumber
    }, {
        verified: false,
        otp: code
    }).exec();

}

module.exports = resend;