import { cy, it } from "local-cypress";

describe("Desktop Navigation", () => {
  it("Navigate to projects page", () => {
    cy.visit("/");
    cy.get('nav a[href="/projects"]:visible').click();
    cy.url().should("include", "/projects");
    cy.get("h1").should("have.text", "Projects");
  });

  it("Navigate to homepage from logo", () => {
    cy.visit("/projects");
    cy.get('nav a[href="/"]:visible').contains("Kyle Gough").click();
    cy.location("pathname").should("eq", "/");
    cy.get("h1").should("have.text", "Kyle Gough");
  });

  it("Navigate to homepage from Home link", () => {
    cy.visit("/projects");
    cy.get('nav a[href="/"]:visible').contains("Home").click();
    cy.location("pathname").should("eq", "/");
    cy.get("h1").should("have.text", "Kyle Gough");
  });
});

export {};
