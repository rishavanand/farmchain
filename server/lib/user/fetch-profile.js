'use strict';

var User = require('../../models/User');
var orders = require('../order');

/* Function to fetch user profile */
var fetchProfile = async (userDetails) => {

    let mobileNumber = userDetails.mobileNumber;

    let user = await User.findOne({
        mobileNumber: mobileNumber
    }, {
        password: 0,
        otp: 0
    }).exec()

    const pendingOrderCount = await orders.fetch.pendingCount(user);
    user = JSON.parse(JSON.stringify(user));
    user.pendingOrderCount = pendingOrderCount;
    return user;

}

module.exports = fetchProfile;