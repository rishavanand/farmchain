'use strict';

var User = require('../../models/User');

/* Function to fetch user profile */
var fetchProfile = async (userDetails) => {

    let mobileNumber = userDetails.mobileNumber;

    let user = await User.findOne({
        mobileNumber: mobileNumber
    }, {
        password: 0,
        _id: 0,
        otp: 0,
        __v: 0
    }).exec()
    
    return user;

}

module.exports = fetchProfile;