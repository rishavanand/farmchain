'use strict';

var login = (req, res, next) => {

    try{

        return res.send('login works');

    }catch(err){
        return next(err);
    }

}

module.exports = login;