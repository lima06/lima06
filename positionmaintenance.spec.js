import { SignIn, ClickButtonByText, CheckTextNotVisible} from "./helpers/general";
import {
    FillInformation, ClickDelete, CheckForBullets, TestforBullets
} from "./helpers/positionmaintenance.js";


describe("Position Maintenance Integration test", () => {

    it("Cannot read property 'designationUniqueID' of null - 7820", () => {
        SignIn(1440, 900);
        ClickButtonByText("Position Management");
        ClickButtonByText("Add");
        FillInformation("New");
        ClickDelete();
        cy.wait(3000)
        //CheckTextNotVisible("Cannot read property 'designationUniqueID' of null");
        cy.get('.col-3').should('not.contain', 'New')
    });

    it("Bullet Points Check on the Job Advert", () => {
        SignIn(1440, 900);
        ClickButtonByText("Position Management");
        ClickButtonByText("Add");
        cy.get('.fa-pencil-square-o').click(); //Click on Edit
        CheckForBullets();
    });

});