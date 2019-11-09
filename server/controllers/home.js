'use strict';

var home = (req, res, next) => {

    try {

        return res.json({
            success: true
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = home;