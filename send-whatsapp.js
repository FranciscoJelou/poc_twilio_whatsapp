require('dotenv').config()
const twilio = require('twilio');

function sendWhatsAppMessage() {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, BOT_NUMBER, SENDER_NUMBER } = process.env;
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  console.log(TWILIO_ACCOUNT_SID)
  client.messages.create({
    from: `whatsapp:${SENDER_NUMBER}`,
    body: 'Hola puedes ayudarme?',
    to: `whatsapp:${BOT_NUMBER}`
  }).then(message => console.log(message.sid));
}

module.exports = { sendWhatsAppMessage };

sendWhatsAppMessage();