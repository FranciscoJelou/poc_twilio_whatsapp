export default {
  twilioBaseUrl: 'https://api.twilio.com/2010-04-01',
  twilioAccountSid: Cypress.env('TWILIO_ACCOUNT_SID'),
  twilioAuth: {
    username: Cypress.env('TWILIO_ACCOUNT_SID'),
    password: Cypress.env('TWILIO_AUTH_TOKEN')
  },
  clientNumber: Cypress.env('SENDER_NUMBER'),
  botNumber: Cypress.env('BOT_NUMBER'),
  messageText: 'Welcome and congratulations!! This message demonstrates your ability to send a WhatsApp message notification. Thank you for taking the time to test with us.',
  maxTimeDifferenceInMinutes: 5,
  maxTimeWaitMessage: 10000
};