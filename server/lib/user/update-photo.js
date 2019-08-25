'use strict';

var User = require('../../models/User');

/* Function to update user photo */
var updatePhoto = async (userDetails) => {
    
    let mobileNumber = userDetails.mobileNumber;

    await User.updateOne({
        mobileNumber: mobileNumber
    }, {
        photoPath: userDetails.photoPath,
        photoName: userDetails.photoName,
        photoMimeType: userDetails.photoMimeType
    }).exec();

}

module.exports = updatePhoto;