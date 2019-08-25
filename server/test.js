const accountSid = 'MG148186410e87a5c5a1cc3efe917c7e11';
const authToken = '518a00c8bf064254f6830fa8972638e6';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: '123456',
     from: 'FARMCHAIN',
     to: '+917479970007'
   })
  .then(message => console.log(message.sid))
  .catch(err => console.log(err))
