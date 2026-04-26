import { cy, it } from 'local-cypress';

describe('Mobile Navigation', () => {
  beforeEach(() => {
    cy.viewport(375, 812);
  });

  it('Navigate to projects page', () => {
    cy.visit('/');
    cy.toggleNavigation();
    cy.get('nav a[href="/projects"]:visible').click();
    cy.url().should('include', '/projects');
    cy.get('h1').should('have.text', 'Projects');
  });

  it('Navigate to homepage', () => {
    cy.visit('/projects');
    cy.toggleNavigation();
    cy.get('nav a[href="/"]:visible').contains('Home').click();
    cy.location('pathname').should('eq', '/');
    cy.get('h1').should('have.text', 'Kyle Gough');
  });
});

export {};
