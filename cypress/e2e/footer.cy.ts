describe('Footer Navigation', () => {
  it('Navigate to about page', () => {
    cy.visit('/');
    cy.get('footer a[href="/about"]').click();
    cy.url().should('include', '/about');
    cy.get('h1').should('have.text', 'About Me');
  });

  it('Navigate to projects page', () => {
    cy.visit('/');
    cy.get('footer a[href="/projects"]').first().click();
    cy.url().should('include', '/projects');
    cy.get('h1').should('have.text', 'Projects');
  });

  it('Navigate to privacy page', () => {
    cy.visit('/about');
    cy.get('footer a[href="/privacy"]').click();
    cy.url().should('include', '/privacy');
    cy.get('h1').should('have.text', 'Privacy Policy');
  });
});

export {};
