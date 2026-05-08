import dayjs from 'dayjs';
import { cy, it } from 'local-cypress';

describe('Contact Form', () => {
  it('Submit contact form with valid details', () => {
    cy.intercept('POST', '/api/send', { id: '0000' }).as('sendEmail');
    cy.visit('/');
    cy.get('#name').focus();
    cy.get('#name').type('Kyle Gough');
    cy.get('#email').focus();
    cy.get('#email').type('kylegough98@gmail.com');
    cy.get('#message').focus();
    cy.get('#message').type(`e2e contact form test at ${dayjs().format()}.`);
    cy.getSubmitButton().click();
    cy.wait('@sendEmail');
    cy.getSubmitButton().should('have.text', 'Message Sent');
  });

  it('Submit contact form with invalid details', () => {
    cy.visit('/');
    cy.getSubmitButton().click();
    cy.getFormLabel('name').should('have.text', 'Required!');
    cy.getFormLabel('email').should('have.text', 'Required!');
    cy.getFormLabel('message').should('have.text', 'Required!');
  });
});

export {};
