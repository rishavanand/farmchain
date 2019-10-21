'use strict';

const lib = require('../../lib');

const fetchAllUserStock = async (req, res, next) => {
    try{

        const user = req.user;
        const stock = await lib.stock.fetch.all(user);
        return res.json({
            success: true,
            payload: {
                stock: stock
            }
        });

    }catch(err){
        return next(err);
    }
}

const trackback = async (req, res, next) => {
    try{
        const user = req.user;
        const stockId = req.params.stockId;
        const trackback = await lib.stock.trackback(stockId, user);
        return res.json({
            success: true,
            payload: {
                trackback: trackback
            }
        });
    }catch(err){
        return next(err);
    }
}

module.exports = {
    fetchAllUserStock: fetchAllUserStock,
    trackback: trackback
}