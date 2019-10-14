'use strict';

var User = require('../../models/User');
var mongoose = require('mongoose');

/* Function to update user balance */
var updateBalance = async (user, amount) => {
    
    const updatables = {
        $inc: {
            walletBalance: parseInt(amount)
        }
    };

    await User.updateOne({
        _id: mongoose.Types.ObjectId(user._id)
    }, updatables).exec();

}

module.exports = updateBalance;