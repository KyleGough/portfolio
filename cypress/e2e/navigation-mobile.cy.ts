import { cy, it } from 'local-cypress';

describe('Mobile Navigation', () => {
  beforeEach(() => {
    cy.viewport(375, 812);
  });

  it('Navigate to projects page', () => {
    cy.visit('/');
    cy.toggleNavigation();
    cy.get('nav a[href="/projects"]:visible').first().as('drawerProjects');
    cy.get('@drawerProjects').click();
    cy.url().should('include', '/projects');
    cy.get('h1.projects-list-page-title').should('contain.text', 'Projects');
  });

  it('Navigate to homepage', () => {
    cy.visit('/projects');
    cy.toggleNavigation();
    cy.get('nav .nav-drawer__link[href="/"]:visible')
      .contains('Home')
      .as('drawerHome');
    cy.get('@drawerHome').click();
    cy.location('pathname').should('eq', '/');
    cy.get('header[aria-label="Welcome"] h1').should(
      'contain.text',
      'Kyle Gough',
    );
  });
});

export {};
