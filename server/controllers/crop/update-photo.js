'use strict';

var lib = require('../../lib');

/* Controller to update crop photo */
var updatePhoto = async (req, res, next) => {

    try {
        
        const photoPath = req.file.path;
        const photoName = req.file.filename;
        const photoMimeType = req.file.mimetype; 
        const cropId = req.params.cropId;
        const user = req.user;

        let cropDetails = {
            owner: user,
            cropId: cropId,
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