import { SignIn, ClickButtonByText } from './helpers/general'

describe("Knowledge Guide Integration tests", () => {

    function KnowledgeGuideSignIn() {
        SignIn();
        ClickButtonByText("Banding Table")
        cy.get('.au-target > .col-12 > .col-10 > .bc-container > .fa:nth-child(4)').click()
        cy.wait(3000)
    }

    it("1.Knowledge Guides toggle button can toggle Advanced Search - 6099", () => {
        KnowledgeGuideSignIn()
        cy.contains("Hide Advanced Search").click();
        cy.wait(1000)
        cy.contains("Search Words").should("not.exist");
        cy.contains("Show Advanced Search").click();
        cy.wait(1000)
        cy.contains("Search Words");
        cy.contains("Hide Advanced Search");
    });

    it("2.Knowledge Guides search Recently Modified - 6101", () => {
        KnowledgeGuideSignIn()
        cy.contains("Recently Modified").click();
        cy.contains("Modified:", { timeout: 1000 });
    });

    it("3.Knowledge Guides search Recently Created - 6102", () => {
        KnowledgeGuideSignIn()
        cy.contains("Recently Created").click();
        cy.contains("Created:", { timeout: 1000 });
    });

    it("4.Knowledge Guides advanced search", () => {
        KnowledgeGuideSignIn()
        cy.get('.dialog-container > .col-12 > .d-flex > .flex-item > #idMainSearchText').type('pay')
        cy.get('.col-12 > .dialog-container > .col-12 > .d-flex > .btn:nth-child(4)').click()
        cy.contains("Add a Paid Break to an Employee");
    });

    it("5.Knowledge Guides search - 6104", () => {
        KnowledgeGuideSignIn()
        cy.get('.dialog-container > .au-target > .col-2 > .input-group > .float-right').type('pay')
        cy.get('.col-12 > .dialog-container > .col-12 > .d-flex > .btn:nth-child(4)').click()
        cy.contains("Add a Paid Break to an Employee");

    });
})