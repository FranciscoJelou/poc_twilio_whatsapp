/// <reference types="Cypress" />

import { 
  twilioBaseUrl,
  twilioAccountSid,
  twilioAuth,
  clientNumber,
  botNumber,
  messageText,
  maxTimeDifferenceInMinutes,
  maxTimeWaitMessage 
} from '../misc/constants';

describe('Sending message to bot whatsapp', () => {

  beforeEach(() => {
    cy.clock();
  });

  it('sends a text message to the bot', () => {
    const currentDate = new Date();
    cy.writeFile('cypress/fixtures/date_sent_message.json', { date_user: currentDate });
    cy.request({
      method: 'POST',
      url: `${twilioBaseUrl}/Accounts/${twilioAccountSid}/Messages.json`,
      auth: twilioAuth,
      form: true,
      body: {
        To: botNumber,
        From: clientNumber,
        Body: messageText
      },
      encoding: 'utf-8'
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it('receives the message and interacts with the bot',
    {
      retries: {
        runMode: 2,
        openMode: 2,
      }
    }, () => {
      cy.wait(maxTimeWaitMessage); //wait for SMS
      cy.request({
        method: 'GET',
        url: `${twilioBaseUrl}/Accounts/${twilioAccountSid}/Messages.json`,
        auth: twilioAuth,
        qs: {
          To: clientNumber,
          From: botNumber,
          PageSize: 1
        }
      }).then((response) => {
        const message = response.body.messages[0];
        cy.readFile('cypress/fixtures/date_sent_message.json').then((date) => {
          const dateUserSentMessage = new Date(date.date_user);
          const convertedDate = new Date(message.date_sent).toISOString();

          const dateSentByUser = new Date(dateUserSentMessage);
          const dateSentByTwilio = new Date(convertedDate);

          const timeDifference = Math.abs(dateSentByTwilio - dateSentByUser) / 1000 / 60;
          expect(timeDifference).to.be.at.most(maxTimeDifferenceInMinutes);
        })

        expect(message.body).to.eq('Hola mundo');
        // expect(message.status).to.eq('received');
        expect(message.from).to.eq(botNumber);
      });
    });
});
