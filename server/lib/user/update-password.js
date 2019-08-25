'use strict';

var User = require('../../models/User');
var bcrypt = require('bcrypt');
var saltRounds = 10;

/* Function to check password */
var checkHashPassword = (plaintextPassword, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plaintextPassword, hash, function (err, res) {
            if (err) {
                return reject(err);
            } else if (res === false) {
                return reject(new Error("Invalid password"));
            } else {
                return resolve(hash);
            }

        });
    });
}

/* Function to hash password */
var hashPassword = (plaintextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plaintextPassword, saltRounds, function (err, hash) {
            if (err)
                return reject(err);
            else
                return resolve(hash);
        });
    });
}

/* Function to update user login password */
var updateProfile = async (userDetails) => {

    let mobileNumber = userDetails.mobileNumber;

    let user = await User.findOne({
        mobileNumber: mobileNumber
    }).exec();

    // Check old password
    let oldPasswordHashDb = user.password;
    await checkHashPassword(userDetails.oldPassword, oldPasswordHashDb);

    // Update password
    let newPasswordHash = await hashPassword(userDetails.newPassword);
    
    await User.updateOne({
        mobileNumber: mobileNumber
    }, {
        password: newPasswordHash
    }).exec();

}

module.exports = updateProfile;