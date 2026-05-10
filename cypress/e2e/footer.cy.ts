import { cy, it } from 'local-cypress';

describe('Footer Navigation', () => {
  it('Navigate to home from footer', () => {
    cy.visit('/projects');
    cy.contains('footer a', /^Home$/).click();
    cy.location('pathname').should('eq', '/');
    cy.get('header[aria-label="Welcome"] h1').should(
      'contain.text',
      'Kyle Gough',
    );
  });

  it('Navigate to projects page', () => {
    cy.visit('/');
    cy.contains('footer a', 'All Projects').click();
    cy.url().should('include', '/projects');
    cy.get('h1.projects-list-page-title').should('contain.text', 'Projects');
  });

  it('Navigate to privacy page', () => {
    cy.visit('/');
    cy.contains('footer a', /^Privacy$/).click();
    cy.url().should('include', '/privacy');
    cy.get('h1.projects-list-page-title').should('contain.text', 'Privacy');
  });
});

export {};
