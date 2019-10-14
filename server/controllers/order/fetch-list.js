'use strict';

var lib = require('../../lib');

/* Controller to list order */
var fetchList = async (req, res, next) => {

    try {

        let user = req.user;

        let orders = await lib.order.fetch.list(user);

        return res.json({
            success: true,
            payload: {
                orders: orders
            }
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = fetchList;