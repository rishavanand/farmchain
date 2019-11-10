'use strict';

const blockchain = require('../blockchain');

const getTransactions = async (userId) => {
    
    const blocks = await blockchain.getChain();

    let transactions = blocks.map(block => block.transactions);
    transactions = transactions.filter(trans => trans.length)
    transactions = [].concat.apply([], transactions);

    const filteredTransactions = [];
    
    for(let i = transactions.length - 1; i >= 0; i -= 1){
        if(transactions[i].type == 'review' && transactions[i].sellerId == userId){
            filteredTransactions.push(transactions[i]);
        }
    }

    return filteredTransactions;

}

/* Function to fetch user review */
var fetchReview = async (userId) => {

    const transactions = await getTransactions(userId);
    const sum = transactions.reduce((total, trans) => {
        return total + trans.stars;
    }, 0);
    return sum / transactions.length;

}


module.exports = fetchReview;