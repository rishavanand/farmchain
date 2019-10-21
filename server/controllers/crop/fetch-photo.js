 'use strict';

/* eslint-disable max-statements */

var lib = require('../../lib');
var path = require('path');

/* Controller to get crop photo */
var fetchPhoto = async (req, res, next) => {

    try {
        const cropId = req.params.cropId;
        const user = req.user;

        let cropDetails = {
            owner: user,
            cropId: cropId
        };

        let [
            photoPath,
            imageType
        ] = await lib.crop.fetch.photo(cropDetails);
        if (!photoPath) {
            photoPath = './logo.png';
            imageType = 'image/png';
        }

        res.set('Content-Type', imageType);
        let absPath = path.join(__dirname, '/../../pics/', photoPath);
        return res.sendfile(absPath);


    } catch (err) {
        return next(err);
    }

}

module.exports = fetchPhoto;