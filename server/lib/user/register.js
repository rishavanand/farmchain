'use strict';

var User = require('../../models/User');
var bcrypt = require('bcrypt');
var saltRounds = 10;
var otp = require('../otp');

/* Function to hash password */
var hashPassword = (plaintextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plaintextPassword, saltRounds, function (err, hash) {
            if(err)
                return reject(err);
            else
                return resolve(hash);
        });
    });
}

/* Function to register new user */
var register = async (userDetails) => {

        let userType = userDetails.userType;
        if(userType !== 'farmer' && userType !== 'retailer' && userType !== 'wholesaler' && userType !== 'consumer')
            throw new Error('Invalid user type');

        let otpCode = await otp.generate(userDetails);

        let user = new User({
            password: await hashPassword(userDetails.password),
            mobileNumber: userDetails.mobileNumber,
            otp: otpCode,
            userType: userType
        });

        await user.save();

}

module.exports = register;