'use strict';

var User = require('../../models/User');

/* Function to remove user */
var removeUser = async (userDetails) => {

    let mobileNumber = userDetails.mobileNumber;

    await User.deleteOne({
        mobileNumber: mobileNumber
    }).exec();

}

module.exports = removeUser;