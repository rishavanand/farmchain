'use strict';

var lib = require('../../lib');

/* Controller to update user profile */
var updateBalance = async (req, res, next) => {

    try {

        const user = req.user;
        const amount = req.body.amount;

        await lib.user.update.balance(user, amount);

        return res.json({
            success: true
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = updateBalance;