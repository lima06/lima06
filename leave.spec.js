import { SignIn, ClickButtonByText, CheckContains, CheckNotContains, GetElement, SwitchToUser, GetElementNoIndex, CheckTextNotVisible, ClickButtonByElement, GoHome } from './helpers/general'

describe("Leave Integration Tests", () => {

    function Setup(department, user) {
        SignIn();
        SwitchToUser(department, user);
        ClickButtonByText('Leave');
        cy.wait(2000)
        CheckTextNotVisible("loading, please wait...")
    }

    function ApplyForLeave(leaveType, check, endWait = 5000, continueAfterCheck=true) {
        ClickButtonByText("Apply for")
        GetElement(".form-control.red-border-input.au-target").select(leaveType);
        cy.wait(2000);
        ClickButtonByText("Submit");
        CheckContains(check);
        if (continueAfterCheck == true) {
            CheckTextNotVisible(check)
            cy.wait(endWait);
        }
    }

    function SubmitLeaveRequest() {
        cy.get(".flex-item.fa.fa-thumbs-o-up.green-text.margin-right5.editable-text.text-center.au-target").click();
    }

    //it("Approve Annual Leave - 6166", () => {
    //    Setup("CHC Admin/Mgmt", "Ella RADFORD (343)-F");
    //    ApplyForLeave("Annual Leave (AL)", "saving, please wait...");
    //    SubmitLeaveRequest();
    //    CheckContains("working, please wait")
    //    CheckNotContains("/^Pending$/");
    //});

    //it("Error thrown when applying for leave on day with leave - 6169", () => {
    //    Setup("LIV Contractor Commission Agents", "Allan THOMPSON (1161)-C");
    //    ApplyForLeave("Annual Leave (AL)", "saving, please wait...");
    //    SubmitLeaveRequest();
    //    CheckContains("working, please wait")
    //    ApplyForLeave("Annual Leave (AL)", "Unable to save your leave request", 0, false);
    //});

    it("Remove leave reviewer from department - 6168", () => {
        cy.wait(2000);
        SignIn();
        SwitchToUser("LIV Contractor Commission Agents", "Allan THOMPSON (1161)-C");

        // Navigate to User Security and select reviewer
        GoHome()
        ClickButtonByText("User Security")
        cy.get('.input-group > .float-right').type('Tom Denton')
        cy.wait(10000);

        // Remove reviewer from department
        cy.get('.au-target:nth-child(2) > .nav-link').click();
        cy.wait(2000)
        cy.get('.fixed-cell .flex-item:nth-child(3)').click({ multiple: true, force: true });
        cy.wait(5000)

        // Navigate back to leave module
        GoHome()
        cy.wait(5000)
        cy.contains('Leave').click({force:true})

        // Click apply for leave button and select leave type
        ClickButtonByText("Apply for");
        GetElement(".form-control.red-border-input.au-target").select("Annual Leave (AL)");

        // Check reviewer no longer exists in DOM
        CheckNotContains("Tom Denton");
    });

});