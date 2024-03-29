import { cy, it } from 'local-cypress';

describe('Desktop Navigation', () => {
  it('Navigate to about page', () => {
    cy.visit('/');
    cy.get('nav a[href="/about"]:visible').click();
    cy.url().should('include', '/about');
    cy.get('h1').should('have.text', 'About Me');
  });

  it('Navigate to projects page', () => {
    cy.visit('/');
    cy.get('nav a[href="/projects"]:visible').click();
    cy.url().should('include', '/projects');
    cy.get('h1').should('have.text', 'Projects');
  });

  it('Navigate to homepage', () => {
    cy.visit('/about');
    cy.get('nav a[href="/"]:visible').contains('Kyle Gough').click();
    cy.url().should('include', '/');
    cy.get('h1').should('have.text', "Hello, I'm Kyle.");
  });

  it('Navigate to homepage', () => {
    cy.visit('/about');
    cy.get('nav a[href="/"]:visible').contains('Home').click();
    cy.url().should('include', '/');
    cy.get('h1').should('have.text', "Hello, I'm Kyle.");
  });
});

export {};
