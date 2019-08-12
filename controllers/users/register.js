'use strict';

var register = (req, res, next) => {

    try{

        return res.send('register works');

    }catch(err){
        return next(err);
    }

}

module.exports = register;