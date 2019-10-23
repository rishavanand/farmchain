'use strict';

const lib = require('../../lib');
const path = require('path');

const fetchAllUserStock = async (req, res, next) => {
    try {

        const user = req.user;
        const stock = await lib.stock.fetch.all(user);
        return res.json({
            success: true,
            payload: {
                stock: stock
            }
        });

    } catch (err) {
        return next(err);
    }
}

const trackback = async (req, res, next) => {
    try {
        const user = req.user;
        const stockId = req.params.stockId;
        const trackback = await lib.stock.trackback(stockId, user);
        return res.json({
            success: true,
            payload: {
                trackback: trackback
            }
        });
    } catch (err) {
        return next(err);
    }
}

/* Controller to get crop photo */
var fetchPhoto = async (req, res, next) => {

    try {
        const stockId = req.params.stockId;
        const user = req.user;

        const photo = await lib.stock.fetch.photo(user, stockId);

        // if (!photoPath) {
        //     photoPath = './logo.png';
        //     imageType = 'image/png';
        // }

        res.set('Content-Type', photo.imageMimeType);
        let absPath = path.join(__dirname, '/../../pics/', photo.imageName);
        return res.sendfile(absPath);


    } catch (err) {
        return next(err);
    }

}

module.exports = {
    fetchAllUserStock: fetchAllUserStock,
    trackback: trackback,
    fetchPhoto: fetchPhoto
}