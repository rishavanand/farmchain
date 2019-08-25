'use strict';

var lib = require('../../lib');
var path = require('path');

/* Controller to get user profile */
var login = async (req, res, next) => {

    try {

        let userDetails = {
            mobileNumber: req.decoded.mobileNumber
        };

        let [photoPath, imageType] = await lib.user.fetch.photo(userDetails);
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

module.exports = login;