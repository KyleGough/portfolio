/// <reference types="cypress" />

import { cy, Cypress } from 'local-cypress';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getFormLabel(label: string): Chainable<Element>;
      getSubmitButton(): Chainable<Element>;
      scrollContactFormIntoView(): Chainable<void>;
      toggleNavigation(): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('toggleNavigation', () => {
  cy.get('nav button[aria-label="Toggle navigation" i]').click();
});

Cypress.Commands.add('getSubmitButton', () => {
  cy.get('[data-testid="contact-send"]');
});

Cypress.Commands.add('scrollContactFormIntoView', () => {
  cy.get('[data-testid="contact-form-email"]').scrollIntoView();
});

Cypress.Commands.add('getFormLabel', (label: string) => {
  cy.get(`label[for="${label}"]`).siblings().first();
});

export {};
