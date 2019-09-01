'use strict';

var lib = require('../../lib');

/* Controller to remove iser */
var removeUser = async (req, res, next) => {

    try {

        let decoded = req.decoded;

        let userDetails = {
            mobileNumber: decoded.mobileNumber,
        };

        await lib.user.remove(userDetails);

        return res.json({
            success: true
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = removeUser;