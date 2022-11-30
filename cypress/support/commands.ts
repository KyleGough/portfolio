/// <reference types="cypress" />

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      toggleNavigation(): Chainable<Element>;
      getSubmitButton(): Chainable<Element>;
      getFormLabel(label: string): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('toggleNavigation', () => {
  cy.get('nav button[aria-label="Toggle Navigation"]').click();
});

Cypress.Commands.add('getSubmitButton', () => {
  cy.get('button#submit');
});

Cypress.Commands.add('getFormLabel', (label: string) => {
  cy.get(`label[for="${label}"]`).siblings().first();
});

export {};
