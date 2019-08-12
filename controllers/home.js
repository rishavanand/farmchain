'use strict';

var lib = require('../lib');

var home = async (req, res, next) => {

    try {

        let userData = {
            mobile: mobile,
            firstName: firstName,
            lastName: lastName,
            userType: userType,
            location: location
        };

        let result = await lib.database.createUser(userData);

        return res.json({
            success: true,
            payload: result
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = home;