'use strict';

var jwt = require('jsonwebtoken');
const models = require('../models');

/* 1st authorization: Allow any user who is logged in */
var all = async (req, res, next) => {

    try {
        
        let token = req.headers['x-access-token'] || req.headers.authorization;
        if (token) {

            if (token.indexOf('Bearer ') == 0) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }

            jwt.verify(token, global.gConfig.jwtSecret, async (err, decoded) => {
                if (err) {
                    return next(new Error('Invalid token'));
                } else {
                    req.decoded = decoded;
                    const mobileNumber = decoded.mobileNumber;
                    const user = await models.User.findOne({mobileNumber: mobileNumber});
                    req.user = user;
                    next();
                }
            });
        } else {
            return next(new Error('Token not found'));
        }

    } catch (err) {
        return next(err);
    }

}

/* 2nd Authorization: Allow only farmers */
var farmer = (req, res, next) => {

    let decoded = req.decoded;
    let userType = decoded.userType;

    if (userType === 'farmer') {
        return next();
    } else {
        return next(new Error('Only farmers are authorized'));
    }

}

/* 2nd Authorization: Allow only wholesalers */
var wholesaler = (req, res, next) => {

    let decoded = req.decoded;
    let userType = decoded.userType;

    if (userType === 'wholesaler') {
        return next();
    } else {
        return next(new Error('Only wholesalers are authorized'));
    }

}

module.exports = {
    all: all,
    farmer: farmer,
    wholesaler: wholesaler
};