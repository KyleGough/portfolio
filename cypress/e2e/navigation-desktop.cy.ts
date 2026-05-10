import { cy, it } from 'local-cypress';

const HERO_HEADING = 'Kyle Gough';

describe('Desktop Navigation', () => {
  it('Navigate to projects page', () => {
    cy.visit('/');
    cy.get('nav a[href="/projects"]:visible').first().as('navProjects');
    cy.get('@navProjects').click();
    cy.url().should('include', '/projects');
    cy.get('h1.projects-list-page-title').should('contain.text', 'Projects');
  });

  it('Navigate to homepage from logo', () => {
    cy.visit('/projects');
    cy.get('nav a[href="/"]:visible').contains(HERO_HEADING).as('logoHome');
    cy.get('@logoHome').click();
    cy.location('pathname').should('eq', '/');
    cy.get('header[aria-label="Welcome"] h1').should(
      'contain.text',
      HERO_HEADING,
    );
  });

  it('Navigate to homepage from Home link', () => {
    cy.visit('/projects');
    cy.get('nav a[href="/"]:visible').contains('Home').as('textHome');
    cy.get('@textHome').click();
    cy.location('pathname').should('eq', '/');
    cy.get('header[aria-label="Welcome"] h1').should(
      'contain.text',
      HERO_HEADING,
    );
  });
});

export {};
