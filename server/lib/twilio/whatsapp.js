'use strict';

console.log(global.gConfig)
const config = global.gConfig;
const twilioSid = config.twilioSid;
const twilioAuthToken = config.twilioAuthToken;
const twilioMobileNumber = config.twilioMobileNumber;
const client = require('twilio')(twilioSid, twilioAuthToken);

/* Function to send whasapp message */
let whatsapp = async (message, mobileNumber) => {

    await client.messages
        .create({
            body: message,
            from: 'whatsapp:' + twilioMobileNumber,
            to: 'whatsapp:' + mobileNumber
        })

}

module.exports = whatsapp;