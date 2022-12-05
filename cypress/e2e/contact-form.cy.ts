import dayjs from 'dayjs';
import { cy, it } from 'local-cypress';

describe('Contact Form', () => {
  it('Submit contact form with valid details', () => {
    cy.intercept('POST', '/api/contact', { success: true }).as('sendMessage');
    cy.visit('/');
    cy.get('#name').focus().type('Kyle Gough');
    cy.get('#email').focus().type('kylegough98@gmail.com');
    cy.get('#message').focus().type(`e2e contact form test at ${dayjs()}.`);
    cy.getSubmitButton().click();
    cy.wait('@sendMessage');
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
