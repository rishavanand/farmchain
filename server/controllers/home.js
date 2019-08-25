'use strict';

var home = (req, res, next) => {

    try {

        return res.json({
            success: true,
            message: 'API server is hot and running'
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = home;