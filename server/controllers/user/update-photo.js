'use strict';

var lib = require('../../lib');

/* Controller to update user photo */
var updateProfile = async (req, res, next) => {

    try {
        
        let decoded = req.decoded;
        let photoPath = req.file.path;
        let photoName = req.file.filename;
        let photoMimeType = req.file.mimetype; 

        let userDetails = {
            mobileNumber: decoded.mobileNumber,
            photoPath: photoPath,
            photoName: photoName,
            photoMimeType: photoMimeType
        };
        
        await lib.user.update.photo(userDetails);

        return res.json({
            success: true
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = updateProfile;