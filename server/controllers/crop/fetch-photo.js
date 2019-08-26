'use strict';

/* eslint-disable max-statements */

var lib = require('../../lib');
var path = require('path');

/* Controller to get crop photo */
var fetchPhoto = async (req, res, next) => {

    try {
        let cropId = req.params.cropId;

        let cropDetails = {
            mobileNumber: req.decoded.mobileNumber,
            cropId: cropId
        };

        let [photoPath, imageType] = await lib.crop.fetch.photo(cropDetails);
        if(!photoPath){
            photoPath = './logo.png';
            imageType = 'image/png';
        }

        res.set('Content-Type', imageType);
        let absPath = path.join(__dirname, '/../../', photoPath);
        return res.sendfile(absPath);


    } catch (err) {
        return next(err);
    }

}

module.exports = fetchPhoto;