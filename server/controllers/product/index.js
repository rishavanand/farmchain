'use strict';

const lib = require('../../lib');
const path = require('path');

const fetchAll = async (req, res, next) => {
    try{

        const user = req.user;
        const filter = {
            name: req.query.name,
            variety: req.query.variety,
            grade: req.query.grade
        };
        
        const products = await lib.product.fetch.all(user, filter);
        const filteredProducts = products.filter(product => product.owner._id != user.id);
 
        return res.json({
            success: true,
            payload: {
                product: filteredProducts
            }
        });

    }catch(err){
        return next(err);
    }
}

/* Controller to get product photo */
var fetchPhoto = async (req, res, next) => {

    try {
        const productId = req.params.productId;
        const photo = await lib.product.fetch.photo(productId);
        
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
    fetch: {
        all: fetchAll,
        photo: fetchPhoto
    }
}