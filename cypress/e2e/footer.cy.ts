import { cy, it } from "local-cypress";

describe("Footer Navigation", () => {
  it("Navigate to home from footer", () => {
    cy.visit("/projects");
    cy.get('footer a[href="/"]').click();
    cy.location("pathname").should("eq", "/");
    cy.get("h1").should("have.text", "Kyle Gough");
  });

  it("Navigate to projects page", () => {
    cy.visit("/");
    cy.get('footer a[href="/projects"]').first().click();
    cy.url().should("include", "/projects");
    cy.get("h1").should("have.text", "Projects");
  });

  it("Navigate to privacy page", () => {
    cy.visit("/");
    cy.get('footer a[href="/privacy"]').click();
    cy.url().should("include", "/privacy");
    cy.get("h1").should("have.text", "Privacy");
  });
});

export {};
