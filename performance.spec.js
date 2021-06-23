import { SignIn, ClickButtonByText, CheckTextNotVisible, CheckNotContains, CheckContains } from "./helpers/general"
/// <reference types="cypress"/>
// cypress/plugins/index.ts
describe("Performance review Integration Tests", () => {

    it.skip('1.performance Review add staff by Individually', () => {
        SignIn(1440, 900);
        ClickButtonByText('Performance Review Templates');
        cy.wait(4000)
        cy.get('#AppraisalManagementTab_divCreateNew_1').click(); //Click on + sign to add Performance
        cy.wait(4000)
        cy.get('#AppraisalCreateDLG_btnCreate_1 > .btn-text-width').click();// Click on Create
        cy.wait(4000)
        cy.get('#AppraisalManagementTab_thAddNewStaff_1').click();// Click Add
        cy.wait(4000)
        cy.get('#quickSearchEmployees1').type('CHC Sales');

       
        cy.get('#quickSearchEmployees1').type('{downarrow}', { force: true });
        cy.wait(2000)
        cy.get('#quickSearchEmployees1').type('{enter}', { force: true });
        cy.wait(4000)
        cy.get('#AppraisalManagementTab_appraisalFormsItemsSource_1_0 > td:nth-child(4)').contains('CHC Sales');
       // cy.contains('Adam clement (68)')

    })


    it.skip('2.performance Review add staff by Department', () => {
        SignIn(1440, 900);
        ClickButtonByText('Performance Review Templates');
        cy.wait(4000)
        cy.get('#AppraisalManagementTab_thAddNewStaff_1').click();// Click +
        //cy.get('#AppraisalStaffAddDLG_selectMethod_1').select('Add staff by department');
        cy.get('#quickSearchDepartment1').type('LIV Admin/ Mgmt');
        cy.wait(2000)
        cy.get('#quickSearchDepartment1').type('{downarrow}', { force: true });
        cy.wait(2000)
        cy.get('#quickSearchDepartment1').type('{enter}', { force: true });
        cy.wait(4000)
        cy.get('#AppraisalManagementTab_searchtxt2_1').type('Alana');
        cy.wait(2000)
        //cy.get('#AppraisalManagementTab_appraisalFormsItemsSource_1_0 > td:nth-child(4)').click();

        cy.get('#AppraisalManagementTab_appraisalFormsItemsSource_1_0 > td:nth-child(4)').contains('LIV Admin/ Mgmt');
        cy.contains('Alana Anderson')

    })

    it.skip('3.performance Review add staff by position', () => {
        SignIn(1440, 900);
        ClickButtonByText('Performance Review Templates');
        cy.wait(4000)
        cy.get('#AppraisalManagementTab_divCreateNew_1').click(); //Click on + sign to add Performance
        cy.wait(4000)
        cy.get('#AppraisalCreateDLG_btnCreate_1 > .btn-text-width').click();// Click on Create
        cy.wait(4000)

        cy.get('#AppraisalManagementTab_thAddNewStaff_1').click();// Click Add
        cy.get('#quickSearchDesignations1').type('Foreman');
        cy.get('#AppraisalStaffAddDLG_btnSave_1 > .btn-text-width').click();


        
        cy.wait(4000)
        cy.get('#quickSearchEmployees1').type('CHC Sales');


        cy.get('#quickSearchEmployees1').type('{downarrow}', { force: true });
        cy.wait(2000)
        cy.get('#quickSearchEmployees1').type('{enter}', { force: true });
        cy.wait(4000)
        cy.get('#AppraisalManagementTab_appraisalFormsItemsSource_1_0 > td:nth-child(4)').contains('CHC Sales');
        // cy.contains('Adam clement (68)')

    })

})