'use strict';

const lib = require('../../lib');
const blockchain = lib.blockchain;

// Get all blocks
const getBlocks = async (req, res, next) => {
    try{
        const blocks = await blockchain.getChain();
        return res.json({
            success: true,
            payload: {
                blocks: blocks
            }
        });
    }catch(err){
        return next(err);
    }
}

// Add transaction to current transaction list
const addTransaction = async (req, res, next) => {
    try{
        const data = req.body.data;
        await blockchain.newTransaction(data);
        return res.json({
            success: true
        })
    }catch(err){
        return next(err);
    }
}

// Mine a block
const mine = async (req, res, next) => {
    try{
        await blockchain.newBlock();
        return res.json({
            success: true
        })
    }catch(err){
        return next(err);
    }
}

// Reset blockchain
const reset = async (req, res, next) => {
    try{
        await blockchain.reset();
        return res.json({
            success: true
        })
    }catch(err){
        return next(err);
    }
}

module.exports = {
    getBlocks: getBlocks,
    addTransaction: addTransaction,
    mine: mine,
    reset: reset
};