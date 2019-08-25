'use strict';

var User = require('../../models/User');

/* Function to fetch user photo */
var fetchPhoto = async (userDetails) => {

    let mobileNumber = userDetails.mobileNumber;

    let user = await User.findOne({
        mobileNumber: mobileNumber
    }, {
        photoPath: 1,
        photoMimeType: 1
    }).exec()
    
    return [user.photoPath, user.photoMimeType];

}

module.exports = fetchPhoto;