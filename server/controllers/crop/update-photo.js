'use strict';

var lib = require('../../lib');

/* Controller to update crop photo */
var updatePhoto = async (req, res, next) => {

    try {
        
        let decoded = req.decoded;
        let photoPath = req.file.path;
        let photoName = req.file.filename;
        let photoMimeType = req.file.mimetype; 
        let cropId = req.params.cropId;

        let cropDetails = {
            cropId: cropId,
            mobileNumber: decoded.mobileNumber,
            photoPath: photoPath,
            photoName: photoName,
            photoMimeType: photoMimeType
        };
        
        await lib.crop.update.photo(cropDetails);

        return res.json({
            success: true
        });

    } catch (err) {
        return next(err);
    }

}

module.exports = updatePhoto;