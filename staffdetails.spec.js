import { SignIn, ClickButtonByText, CheckContains, CheckNotContains, XHRWait, CheckTextNotVisible, SwitchToUser, SearchTheUser } from './helpers/general'
import { CollapseCategories, LoadStaffNotesDocumentsTab, AddStaffNote, LoadPerformanceMgmttab, AddPerformanceDetails, AddNewStaff, AddTrainingForm, LoadTrainingTab} from './helpers/staffdetails'

describe("Staff Details Modules Integration Tests - 8153", () => {
    

    it("1.Collapse categories - 8154", () => {
        SignIn(1440, 900)
        ClickButtonByText("Staff Details")
        
        CollapseCategories(true, true, true, true, true)
        CheckContains("Personal Details") 
        CheckTextNotVisible("First Name")
        CheckContains("Payroll Details")
        CheckTextNotVisible("Tool Allowance")
        CheckContains("Operational Details")
        CheckTextNotVisible("Break Duration")
        CheckContains("KiwiSaver")
        CheckTextNotVisible("Employee Contribution")
        CheckContains("Right to Work NZ")
        CheckTextNotVisible("Nationality on ID")
    })

    it("2.Add staff note - 8156", () => {
        SignIn(1440, 800)
        ClickButtonByText("Staff Details")
        LoadStaffNotesDocumentsTab()
        AddStaffNote('Employment Agreement', 'IEA')
        CheckContains('Employment Agreement')
    })

    it("3.Add performance management form - 8157", () => {
        SignIn(1440, 900)
        ClickButtonByText("Staff Details")
        LoadPerformanceMgmttab()
        AddPerformanceDetails("CHC Admin/Mgmt", "Ella RADFORD", "AWESOME","01/04/2020", "Late Arrival", "1st Time")
        CheckContains("Ella RADFORD")
    })

    it("4.Add training form - 8158", () => {
        SignIn(1440, 900)
        ClickButtonByText("Staff Details")
        LoadTrainingTab()
        AddTrainingForm("5S - Carrfields Way", "5S - Carrfields Way", "02/05/2020")
        CheckContains("5S - Carrfields Way")
    })

    it("5.Add new staff - 8159", () => {
        SignIn(1440, 900)
        ClickButtonByText("Staff Details")
        AddNewStaff("Bruce", "Banner", "03/01/2022", "CHC Admin/Mgmt")
        cy.wait(2000)
        //CheckTextNotVisible("adding the staff member")
        cy.wait(13000)
        SearchTheUser("Bruce")
    })

    it("6.Error thrown when adding new staff with no first name - 8160", () => {
        SignIn(1440, 900)
        ClickButtonByText("Staff Details")
        AddNewStaff(" ", "halaway", "02/06/2020", "CHC Admin/Mgmt")
        CheckContains("Staff Details - Please enter the FIRST NAME")
    })

    it("7.Error thrown when adding new staff with no last name - 8161", () => {
        SignIn(1440, 900)
        ClickButtonByText("Staff Details")
        AddNewStaff("Michael", " ", "02/05/2021", "CHC Admin/Mgmt")
        CheckContains("Staff Details - Please enter the LAST NAME")
    })

    it("8.Error thrown when adding new staff with no date of joining", () => {
        SignIn(1440, 900)
        ClickButtonByText("Staff Details")
        AddNewStaff("Trevor", "phillips", " ", "CHC Admin/Mgmt")
        CheckContains("Staff Details - Ooops! You have found a problem. Please try again.")
    })

    it.skip("9.Standard format check - Tax number", () => {
        SignIn(1440, 900)
        ClickButtonByText("Staff Details")
        cy.wait(5000)
        cy.get('.col-3:nth-child(1) > .input-group > .form-control').type('tax number');
        cy.wait(5000)
        // cy.get('.add-on-inputs').type('{backspace}');
        cy.get('.add-on-inputs').clear();
        cy.get('.add-on-inputs').type('000-000-001');
        cy.get('.au-target > .btnTick > .btn-text-width').click();
        cy.get('.alert-block .alert-danger > .close').click();
        cy.get('.add-on-inputs').type('{backspace}');
        cy.get('.add-on-inputs').type('000-000-000');
        cy.wait(5000)
        cy.get('#fac08794-3337-4f88-97b9-ace4b24d366c1').click();
        cy.get('.btnTick:nth-child(2) > .btn-text-width').click();


    })
})