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
            await this.newBlock(true);
        }
    }

    // Get all blocks
    async getChain () {
        let chain = await Block.find().exec();
        chain = chain.map(block => block.data);
        this.chain = chain;
        return chain;
    }

    // Reset blockchain
    async reset () {
        await Block.deleteMany().exec();
        await this.init();
        this.currentTransactions = [];
    }

    // Create new block
    async newBlock (genesis) {

        if (this.currentTransactions.length === 0 && genesis !== true)
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
            data: block
        });
        await newBlock.save();

        // Clear current transactions list
        this.currentTransactions = [];
    }
}

const blockchain = new Blockchain();
blockchain.init()
    .catch(console.log)
    .then(() => {
        setInterval(async () => {
            await blockchain.newBlock();
        }, 15000);
    })

module.exports = blockchain;