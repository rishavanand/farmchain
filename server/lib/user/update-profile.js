'use strict';

var User = require('../../models/User');

/* Function to update user profile */
var updateProfile = async (userDetails) => {

    let mobileNumber = userDetails.mobileNumber;

    let updatables = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        city: userDetails.city,
        state: userDetails.state,
        address: userDetails.address,
        longitude: userDetails.longitude,
        latitude: userDetails.latitude
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