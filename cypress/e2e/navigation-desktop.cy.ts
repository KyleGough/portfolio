import { cy, it } from 'local-cypress';

const HERO_HEADING = 'Kyle Gough';

describe('Desktop Navigation', () => {
  it('Navigate to projects page', () => {
    cy.visit('/');
    cy.get('nav a[href="/projects"]:visible').click();
    cy.url().should('include', '/projects');
    cy.get('h1').should('have.text', 'Projects');
  });

  it('Navigate to homepage from logo', () => {
    cy.visit('/projects');
    cy.get('nav a[href="/"]:visible').contains(HERO_HEADING).click();
    cy.location('pathname').should('eq', '/');
    cy.get('h1').should('have.text', HERO_HEADING);
  });

  it('Navigate to homepage from Home link', () => {
    cy.visit('/projects');
    cy.get('nav a[href="/"]:visible').contains('Home').click();
    cy.location('pathname').should('eq', '/');
    cy.get('h1').should('have.text', HERO_HEADING);
  });
});

export {};
