import { SignIn, ClickButtonByText, CheckNotContains, CheckContains, CheckTextNotVisible, SwitchToUser, SearchTheUser } from "./helpers/general"
import { CheckConsequence, CheckLikelihood, FillHazardForm, ChangeRiskStatus, SearchandSignin} from "./helpers/hazardriskregister"

describe("Hazard Integration Tests", () => {
    it("Check if user can add new hazard from Hazard risk register and verify the values Hazard maintenance- 11952 ", () => {
        SignIn(1500, 900)
        ClickButtonByText(' Hazard Risk Register')
        cy.wait(5000)
        ClickButtonByText("Add")
        cy.wait(2000)
        FillHazardForm('Work place hazard-name') 
       // check consequence drop down options and select Major
        CheckConsequence('Major (4)')
        //check the drop down values of Likelihood and selecting value Possible
        CheckLikelihood('Possible (3)')
        //Select Hazard Type and Critical Risk
        ClickButtonByText("Save")
        cy.wait(2000)
        cy.get('.col-3:nth-child(1) > .input-group > .form-control').type('Stewart Miller');
        cy.wait(4000)
        cy.get('.col-12:nth-child(2) > .form-control').type('Enter any additional comments');
        cy.wait(2000)
        cy.get('.btn-green-fill > span').click();
        cy.get('.btn-secondary').click();
        cy.wait(2000)   
        cy.get('tr:nth-child(1) > td:nth-child(5)').contains('Work place hazard-name');
        cy.get('tr:nth-child(1) > td:nth-child(8)').contains('Fatigue');
        cy.get('tr:nth-child(1) .vertical-center-parent > .padding-5').click();
        ChangeRiskStatus()
        cy.get('.table-cell-sm-text > tr:nth-child(1)').click();
        cy.get('tr:nth-child(1) > td:nth-child(5)').contains('Work place hazard-name');
    })
    it("Test the Hazard Manager notifications- 12020  ", () => {
        SignIn(1500, 900);
        ClickButtonByText(' Hazard Risk Register');
        cy.wait(5000)
        ClickButtonByText("Add");
        cy.wait(2000);
        FillHazardForm("Machine hazard-name") 
        cy.wait(3000)
        ClickButtonByText("Save")
        cy.wait(2000)
        cy.get('.col-3:nth-child(1) > .input-group > .form-control').type('Stewart Miller');
        cy.wait(4000)
        cy.get('.col-12:nth-child(2) > .form-control').type('Enter any additional comments');
        cy.wait(2000)
        cy.get('.btn-green-fill > span').click();
        cy.get('.btn-secondary').click();
        cy.wait(2000)
        cy.get('tr:nth-child(1) > td:nth-child(5)').contains('Machine hazard-name');
        cy.get('tr:nth-child(1) > td:nth-child(8)').contains('Fatigue');
        ClickButtonByText('Home')
        SearchandSignin('Stewart Miller')
        cy.wait(4000)
        cy.get('#tab_0 .margin-right5:nth-child(1) .notification-item-img').click();
        cy.get('.cursor-pointer:nth-child(1) > .text-center:nth-child(2) > .p-1').click();
        cy.get('.cursor-pointer:nth-child(1) > td:nth-child(5)').contains('Machine hazard-name');


    })

})

