'use strict';

var lib = require('../../lib');

/* Controller to approve order */
var approve = async (req, res, next) => {

    try {

        let user = req.user;
        let order = {
            id: req.body.orderId
        }

        const result = await lib.order.approve(user, order);

        return res.json({
            success: true,
            payload: result
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = approve;