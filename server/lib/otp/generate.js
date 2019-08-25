'use strict';

var randomize = require('randomatic');
var twilio = require('../twilio');

/* Function to generate OTP code */
var generate = async (userDetais) => {

    let code = randomize('0', 6);
    let message = `Yout Framchain OTP is : ${code}`;
    await twilio.whatsapp(message, userDetais.mobileNumber);
    return code;

}

module.exports = generate;