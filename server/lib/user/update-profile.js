'use strict';

var User = require('../../models/User');

/* Function to update user profile */
var updateProfile = async (userDetails) => {

    let mobileNumber = userDetails.mobileNumber;

    let updatables = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        farmCity: userDetails.farmCity,
        farmState: userDetails.farmState,
        shopCity: userDetails.shopCity,
        shopState: userDetails.shopState,
        address: userDetails.address
    };

    let keys = Object.keys(updatables);
    keys.map((key) => {
        if (!updatables[key]) {
            Reflect.deleteProperty(updatables, key);
        }
    });

    await User.updateOne({
        mobileNumber: mobileNumber
    }, updatables).exec();

}

module.exports = updateProfile;