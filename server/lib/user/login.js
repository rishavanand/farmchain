'use strict';

var User = require('../../models/User');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

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

/* Function to login an user */
var login = async (userDetails) => {

    let user = await User.findOne({
        mobileNumber: userDetails.mobileNumber
    }).exec();

    if(!user)
        throw new Error('User not registered');

    let hash = user.password;
    let verified = user.verified;

    if (!verified)
        throw new Error('Mobile number not verified');

    await checkHashPassword(userDetails.password, hash);

    return new Promise((resolve, reject) => {

        const secret = global.gConfig.jwtSecret;
        
        jwt.sign({
            mobileNumber: user.mobileNumber,
            userType: user.userType,
            _id: user._id
        }, secret, {
            expiresIn: '2400h'
        }, (err, token) => {
            if (err) return reject(err);
            return resolve(token);
        });

    });


}

module.exports = login;