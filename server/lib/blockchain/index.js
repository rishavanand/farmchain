'use strict';

const models = require('../../models');
const CryptoJs = require("crypto-js");
const Block = models.Block;

class Blockchain {

    constructor () {
        // Initialize empty list of pending transactions
        this.currentTransactions = [];
    }

    async init () {
        // Create genesis block
        await this.createGenesisBlock();
    }

    // Add new transaction to current transaction list
    newTransaction (data) {
        this.currentTransactions.push(data);
    }

    // Create genesis/first block
    async createGenesisBlock () {
        // Get chain
        const chain = await this.getChain();
        if (chain.length === 0) {
            // When no blocks available
            console.log('Creating fresh chain');
            await this.newBlock();
        }
    }

    // Get all blocks
    async getChain () {
        let chain = await Block.find().exec();
        chain = chain.map(block => block.blockList);
        this.chain = chain;
        return chain;
    }

    // Create new block
    async newBlock () {

        if(this.currentTransactions.length === 0)
            return;

        // Calculate previous hash
        const chain = await this.getChain();
        const lastBlock = chain[chain.length - 1];
        let previousHash = null;
        if (chain.length > 0)
            previousHash = CryptoJs.SHA256(JSON.stringify(lastBlock)).toString(CryptoJs.enc.Hex);

        // Define block contents
        const block = {
            index: chain.length,
            timestamp: Date.now(),
            transactions: this.currentTransactions,
            previousHash: previousHash
        };

        // Add to block
        const newBlock = new Block({
            blockList: block
        });
        await newBlock.save();

        // Clear current transactions list
        this.currentTransactions = [];
    }
}

module.exports = Blockchain;