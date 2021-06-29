describe("Unit Test web app for Sky italia", () => {
  it("Search some topics", () => {
    // Search ITALY topic
    cy.visit("/");
    cy.wait(1000);
    cy.get("button#clearInput").click();
    cy.wait(2000);
    cy.get("input")
    .type("Italy")
    .should("have.value", "Italy");
    cy.wait(500);
    cy.get("button.searchBtn").click();
    cy.wait(3000);
    // Search FRANCE topic
    cy.get("input")
    .type("France")
    .should("have.value", "France");
    cy.get("button.searchBtn").click();
    cy.wait(2000);
    // Search Euro2020 topic
    cy.get("input")
    .type("Euro2020")
    .should("have.value", "Euro2020");
    cy.get("button.searchBtn").click();
    cy.scrollTo(0, 0);
    cy.wait(2000);
    // Search Greece topic
    cy.get("input")
    .type("Greece")
    .should("have.value", "Greece");
    cy.get("button.searchBtn").click();
    cy.scrollTo(0, 0);
    cy.wait(3000);
    // Mobile viewport
    cy.viewport(400, 700)
    cy.wait(2000);
    // Remove Topics
    cy.get("span#removeTopicFrance").click();
    cy.wait(1000);
    cy.get("span#removeTopicItaly").click();
    cy.wait(1000);
    // Reinsert topics already existing
    // Search Euro2020 topic
    cy.get("input")
    .type("Euro2020")
    .should("have.value", "Euro2020");
    cy.get("button.searchBtn").click();
    cy.scrollTo(0, 0);
    cy.wait(4000);
    // go to Detail Topic
    cy.get(".card1").click();
    cy.wait(3000);
    cy.get("span.rightArrow ").click();
    cy.wait(2000);
    cy.get("span.rightArrow ").click();
    cy.wait(2000);
    // Mobile viewport
    cy.viewport(1600, 900)
    cy.wait(2000);
    cy.get("span.leftArrow ").click();
    cy.wait(2000);
    cy.get("span.leftArrow ").click();
    cy.wait(2000);
    cy.get("span.closeBtn ").click();
  });
});