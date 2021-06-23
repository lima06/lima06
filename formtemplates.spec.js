import { SignIn, ClickButtonByText, SwitchToUser, SignInUser, CheckTextNotVisible, CheckContains, GoHome, SignOut, XHRWait } from './helpers/general'
import { CheckONFormOption, CheckOFFFormOption, EnterNewFormInformation, CheckForm, CreateNewForm, CheckTableNotContains, CheckTableContains, AddUserToViewersList, AddUserToApproversList, CreateFormByManager, CopyFormTemplate, EditFormName, CreateReportanAccidentForm, ConfirmReportAnAccident } from './helpers/formtemplate'

describe("Form Template Module Integration Tests", () => {



    it("1.Manager can view form- created by manager -if require employee on- manager can see staff- 7933", () => {
        SignIn(1440, 900);
        ClickButtonByText("Form Templates")
        CreateNewForm("$ABX", "AB", "Employee (and above)")
        CheckONFormOption("Requires Employee");
        CheckONFormOption("Managers can view staff with form");
        CheckONFormOption("Limit To User Security")
        cy.get('.btnTick > .btn-text-width').click();//Save
        GoHome();
        cy.wait(13000)
        //CheckTextNotVisible("loading, please wait...", 10000);
        ClickButtonByText("Forms / Checklist");
        cy.wait(13000)
       // CheckTextNotVisible("loading, please wait...", 10000);
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F");
        CreateFormByManager("$ABX");
        cy.wait(15000)
        //CheckTextNotVisible("loading home, please wait...");
        cy.get('#formChecklistDlg_btnClose_1').click();//Close Form
        cy.wait(3000)
        GoHome();
        cy.get('#modules > .col-6:nth-child(9) > .home-kiosk-block').click(); //Click Form Template
        cy.wait(3000)
        ClickButtonByText("$ABX")
        cy.get('.d-flex:nth-child(3) > .pl-10 .form-control').select("Employee only");
        //cy.get('.btnTick').click();
        cy.wait(3000)
        SignOut();
        SignInUser("Adam.Clement@unittestdb", "Zambion@12");
        cy.wait(3000)
        //cy.get('.mb-15').type('checked in');//checkin
        //cy.get('.col-3:nth-child(2)').click();
        // cy.get('.dialog-header-content').click();
        //cy.get('.float-right').click();
        cy.wait(3000)
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F");
        ClickButtonByText("Forms / Checklist");
        CheckTableContains("$ABX")
    })

    it("2.Manager cannot see the form - require employee on - manager can see employee is off. - 7915", () => {
        SignIn(1440, 900);
        ClickButtonByText("Form Templates")
        CreateNewForm("$AA", "AA", "Employee (and above)")
        CheckONFormOption("Requires Employee");
        CheckONFormOption("Limit To User Security")
        cy.get('.btnTick > .btn-text-width').click();//Save
        GoHome();
        ClickButtonByText("Forms / Checklist");
        cy.wait(13000)
        //CheckTextNotVisible("loading, please wait...", 10000);
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F")
        CreateFormByManager("$AA");
        cy.wait(13000)
        //CheckTextNotVisible("loading, please wait...")
        cy.get('.close-footer-btn').click();//Close Form
        GoHome();
        cy.wait(5000)
        cy.get('#modules > .col-6:nth-child(9) > .home-kiosk-block').click(); //Click Form Template
        cy.wait(3000)
        ClickButtonByText("$AA")
        cy.get('.d-flex:nth-child(3) > .pl-10 .form-control').select("Employee only");
        cy.get('.btnTick').click({ force: true });
        cy.wait(3000)
        SignOut();
        SignInUser("Adam.Clement@unittestdb", "Zambion@12");
        //cy.get('.mb-15').type('checked in');
        //cy.get('.col-3:nth-child(2)').click();
        //cy.get('.float-right').click();
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F")
        ClickButtonByText("Forms / Checklist");
        CheckTableNotContains("$AA");

    });



    it("3.Manager can see the form - 7967", () => {
        SignIn(1440, 900);
        ClickButtonByText("Form Templates")
        CreateNewForm("$AC", "AC", "Employee (and above)")
        XHRWait()
        CheckONFormOption("Requires Employee");
        CheckONFormOption("Managers can view staff with form");
        CheckONFormOption("Limit To User Security")
        cy.get('.btnTick > .btn-text-width').click();//Save
        XHRWait();
        GoHome();
        ClickButtonByText("Forms / Checklist");
        cy.wait(3000)
        CheckTextNotVisible("loading, please wait...", 10000);
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F")
        CreateFormByManager("$AC");
        cy.wait(3000)
        CheckTextNotVisible("loading, please wait...")
        cy.get('.close-footer-btn').click();//Close Form
        GoHome();
        cy.get('#modules > .col-6:nth-child(9) > .home-kiosk-block').click(); //Click Form Template
        cy.wait(5000)
        ClickButtonByText("$AC")
        cy.get('.d-flex:nth-child(3) > .pl-10 .form-control').select("Employee only");
        cy.get('.btnTick').click();
        cy.wait(3000)
        SignOut();
        SignInUser("Adam.Clement@unittestdb", "Zambion@12");
        cy.wait(3000)
        //cy.get('.mb-15').type('checked in');
       // cy.get('.col-3:nth-child(2)').click();
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F");
        cy.wait(3000)
        ClickButtonByText("Forms / Checklist");
        cy.wait(5000)
        CheckTableContains("$AC")
    });

    it("4.Manager cannot see the form when the form is pending and hide pending form is on - 7974", () => {
        SignIn(1440, 900);
        ClickButtonByText("Form Template")
        CreateNewForm("$AD", "AD", "Employee (and above)")
        CheckONFormOption("Requires Employee")
        CheckONFormOption("Managers can view staff with form")
        CheckONFormOption("Limit To User Security")
        CheckONFormOption("Hide Pending Forms");
        cy.get('.btnTick > .btn-text-width').click();//Save
        GoHome();
        cy.wait(3000)
        ClickButtonByText("Forms / Checklist")
        cy.wait(3000)
        CheckTextNotVisible("loading, please wait...", 10000);
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F")
        CreateFormByManager("$AD")
        cy.wait(3000)
        CheckTextNotVisible("loading, please wait...")
        cy.get('.close-footer-btn').click();//Close Form
        GoHome()
        cy.get('#modules > .col-6:nth-child(9) > .home-kiosk-block').click(); //Click Form Template
        cy.wait(5000)
        ClickButtonByText("$AD")
        cy.get('.d-flex:nth-child(3) > .pl-10 .form-control').select("Employee only");
        cy.get('.btnTick').click();
        cy.wait(3000)
        SignOut();
        SignInUser("Adam.Clement@unittestdb", "Zambion@12")
        cy.wait(4000)
       // cy.get('.mb-15').type('checked in');
       // cy.get('.col-3:nth-child(2)').click();
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F");
        ClickButtonByText("Forms / Checklist");
        CheckTableNotContains("$AD")
    })

    it("5.Manger can view employess outside viewing list - 7975", () => {
        // Manger can view form eventhough he has not access to the employee because he is in the form viewer list
        SignIn(1440, 900);
        ClickButtonByText("Form Templates")
        CreateNewForm("$AE", "AE", "Employee (and above)")
        CheckONFormOption("Requires Employee");
        cy.get('.btnTick > .btn-text-width').click();//Save
        AddUserToViewersList("Adam Clement");
        GoHome();
        ClickButtonByText("Forms / Checklist");
        cy.wait(13000)
        //CheckTextNotVisible("loading, please wait...", 10000);
        SwitchToUser("CHC Admin/Mgmt", "Ella RADFORD (343)-F")
        CreateFormByManager("$AE");
        cy.wait(13000)
        //CheckTextNotVisible("loading, please wait...")
        cy.get('.close-footer-btn').click();//Close Form
        GoHome();
        cy.get('#modules > .col-6:nth-child(9) > .home-kiosk-block').click(); //Click Form Template
        cy.wait(5000)
        ClickButtonByText("$AE")
        cy.get('.d-flex:nth-child(3) > .pl-10 .form-control').select("Employee only");
        cy.get('.btnTick').click();
        cy.wait(3000)
        SignOut();
        SignInUser("Adam.Clement@unittestdb", "Zambion@12");
        cy.wait(3000)
        //cy.get('.mb-15').type('checked in');
        //cy.get('.col-3:nth-child(2)').click();
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F");
        ClickButtonByText("Forms / Checklist");
        CheckTableContains("$AE")
    })

    it("6.Manager cannot see the form when limit user security is on even if he is the form viewer - 7976", () => {
        SignIn(1440, 900);
        ClickButtonByText("Form Templates")
        CreateNewForm("$AF", "AF", "Employee (and above)")
        CheckONFormOption("Requires Employee");
        CheckONFormOption("Limit To User Security")
        cy.get('.btnTick > .btn-text-width').click();//Save
        AddUserToViewersList("Adam Clement");
        GoHome();
        ClickButtonByText("Forms / Checklist");
        cy.wait(3000)
        CheckTextNotVisible("loading, please wait...", 10000);
        SwitchToUser("CHC Admin/Mgmt", "Ella RADFORD (343)-F")
        CreateFormByManager("$AF");
        CheckTextNotVisible("loading, please wait...")
        cy.get('.close-footer-btn').click();//Close Form
        GoHome();
        cy.get('#modules > .col-6:nth-child(9) > .home-kiosk-block').click(); //Click Form Template
        cy.wait(5000)
        ClickButtonByText("$AF")
        cy.get('.d-flex:nth-child(3) > .pl-10 .form-control').select("Employee only");
        cy.get('.btnTick').click();
        cy.wait(3000)
        SignOut();
        SignInUser("Adam.Clement@unittestdb", "Zambion@12");
        cy.wait(3000)
        //cy.get('.mb-15').type('checked in');
        //cy.get('.col-3:nth-child(2)').click();
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F");
        cy.wait(3000)
        ClickButtonByText("Forms / Checklist");
        CheckTableNotContains("$AF")
    })

    it("7.Manager is not approver/viewer and form is not requires employee, form is waiting approval. Can't see form - 7986", () => {
        SignIn(1440, 900);
        ClickButtonByText("Form Templates")
        CreateNewForm("$AH", "AH", "Employee (and above)");
        AddUserToApproversList("Chris Pay");
        GoHome();
        ClickButtonByText("Forms / Checklist");
        cy.wait(13000)
        //CheckTextNotVisible("loading, please wait...", 10000);
        SwitchToUser("CHC Admin/Mgmt", "Ella RADFORD (343)-F")
        CreateFormByManager("$AH");
        cy.wait(13000)
        //CheckTextNotVisible("loading, please wait...")
        cy.get('.margin-top5:nth-child(1)').click(); //Click Sumbit
        cy.wait(3000)
       // CheckTextNotVisible("loading, please wait...")
        cy.get('.close-footer-btn').click();//Close Form
        GoHome();
        cy.get('#modules > .col-6:nth-child(9) > .home-kiosk-block').click(); //Click Form Template
        cy.wait(3000)
        ClickButtonByText("$AH")
        cy.get('.d-flex:nth-child(3) > .pl-10 .form-control').select("Employee only");
        cy.get('.btnTick').click();
        cy.wait(3000)
        SignOut();
        cy.wait(9000);
        SignInUser("Adam.Clement@unittestdb", "Zambion@12");
        cy.wait(3000)
       // cy.get('.mb-15').type('checked in');
        //cy.get('.col-3:nth-child(2)').click();
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F");
        cy.wait(4000)
        ClickButtonByText("Forms / Checklist");
        CheckTableNotContains("$AH")

    })

    it("8.Manager is not approver but is a viewer and form is not requires employee, form is waiting approval. Can see form - 7990", () => {
        SignIn(1440, 900);
        ClickButtonByText("Form Templates")
        CreateNewForm("$AI", "AI", "Employee (and above)")
        AddUserToViewersList("Adam Clement");
        AddUserToApproversList("Chris Pay");
        GoHome();
        ClickButtonByText("Forms / Checklist");
        cy.wait(3000)
        CheckTextNotVisible("loading, please wait...", 10000);
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F")
        CreateFormByManager("$AI");
        cy.wait(3000)
        CheckTextNotVisible("loading, please wait...")
        cy.get('.margin-top5:nth-child(1) > .btn-text-width').click();
        cy.get('.close-footer-btn').click();
        GoHome();
        cy.get('#modules > .col-6:nth-child(9) > .home-kiosk-block').click(); //Click Form Template
        cy.wait(3000)
        ClickButtonByText("$AI")
        cy.get('.d-flex:nth-child(3) > .pl-10 .form-control').select("Employee only");
        cy.get('.btnTick').click();
        cy.wait(3000)
        SignOut();
        SignInUser("Adam.Clement@unittestdb", "Zambion@12");
        cy.wait(3000)
        //cy.get('.mb-15').type('checked in');
        //cy.get('.col-3:nth-child(2)').click();
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F")
        cy.wait(3000)
        ClickButtonByText("Forms / Checklist");
        CheckTableContains("$AI")

    })

    it("9.Manager is not viewer but is approver and form is not requires employee, form is waiting approval. Can see form - 7995", () => {
        SignIn(1440, 900);
        cy.wait(3000)
        ClickButtonByText("Form Templates")
        CreateNewForm("$AJ", "AJ", "Employee (and above)")
        AddUserToApproversList("Adam Clement");
        GoHome();
        ClickButtonByText("Forms / Checklist");
        cy.wait(3000)
        CheckTextNotVisible("loading, please wait...", 10000);
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F")
        CreateFormByManager("$AJ");
        cy.wait(3000)
        CheckTextNotVisible("loading, please wait...")
        cy.get('.margin-top5:nth-child(1) > .btn-text-width').click();// Click Submit
        cy.wait(3000)
        CheckTextNotVisible("loading, please wait...")
        cy.get('.close-footer-btn').click();//Click CLose
        GoHome();
        cy.get('#modules > .col-6:nth-child(9) > .home-kiosk-block').click();//Click Form Template
        cy.wait(3000)
        ClickButtonByText("$AJ");
        cy.get('.d-flex:nth-child(3) > .pl-10 .form-control').select("Employee only");
        cy.get('.btnTick').click();
        cy.wait(3000)
        SignOut();
        SignInUser("Adam.Clement@unittestdb", "Zambion@12");
        cy.wait(3000)
        //cy.get('.mb-15').type('checked in');
        //cy.get('.col-3:nth-child(2)').click();
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F")
        cy.wait(3000)
        ClickButtonByText("Forms / Checklist");
        CheckTableContains("$AJ")
    })

    it("10.Manager is not approver/viewer but has created the form. Form is not requires employee, form is Pending. Can see form - 8014", () => {
        SignIn(1440, 900);
        ClickButtonByText("Form Templates")
        CreateNewForm("$AK", "AK", "Manager (and above)")
        cy.wait(5000);
        SignOut();
        SignInUser("Adam.Clement@unittestdb", "Zambion@12")
        cy.wait(3000)
        //cy.get('.mb-15').type('checked in');
       // cy.get('.col-3:nth-child(2)').click();
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F")
        cy.wait(3000)
        ClickButtonByText("Forms / Checklist")
        CreateFormByManager("$AK");
        cy.wait(3000)
        CheckTextNotVisible("loading, please wait...")
        cy.get('.close-footer-btn').click();//Click CLose
        CheckTableContains("$AK")
    })

    it("11.Manager is not approver/viewer but has created the form. Form is not requires employee, form is waiting approval. Can't see form - 8015", () => {
        SignIn(1440, 900)
        ClickButtonByText("Form Templates")
        CreateNewForm("$AL", "AL", "Manager (and above)");
        AddUserToApproversList("Chris Pay");
        cy.wait(3000);
        SignOut()
        SignInUser("Adam.Clement@unittestdb", "Zambion@12");
        cy.wait(3000)
        //cy.get('.mb-15').type('checked in');
        //cy.get('.col-3:nth-child(2)').click();
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F")
        cy.wait(3000)
        ClickButtonByText("Forms / Checklist");
        cy.wait(3000);
        CreateFormByManager("$AL")
        cy.wait(3000)
        CheckTextNotVisible("loading, please wait...")
        cy.get('.btn-group > .flex-item > .button:nth-child(1)').click();// Click Submit
        CheckTextNotVisible("loading, please wait...", 40000)
        cy.get('.close-footer-btn').click();//Click CLose
        CheckTableNotContains("$AL")
    })

    it("12.Manager is not approver/viewer but has created the form. Form is not requires employee, form is Pending. Form also has Hide Pending Forms. Cant see form - 8016", () => {
        SignIn(1440, 900)
        cy.wait(5000);
        ClickButtonByText("Form Templates");
        CreateNewForm("$AM", "AM", "Manager (and above)");
        CheckONFormOption("Hide Pending Forms");
        cy.get('.btnTick > .btn-text-width').click();//Save
        cy.wait(5000);
        SignOut();
        SignInUser("Adam.Clement@unittestdb", "Zambion@12")
        cy.wait(3000)
        //cy.get('.mb-15').type('checked in');
        //cy.get('.col-3:nth-child(2)').click();
        cy.wait(5000);
        SwitchToUser("CHC Sales", "Alexander (Alex) WOOD (50)-F")
        cy.wait(3000)
        ClickButtonByText("Forms / Checklist");
        cy.wait(3000);
        CreateFormByManager("$AM")
        cy.wait(3000)
        CheckTextNotVisible("loading, please wait...", 40000)
        cy.get('.close-footer-btn').click();//Click CLose
        CheckTableContains("$AM")
    });

    it("13.Copy and edit form template - 8151", () => {
        SignIn(1440, 900)
        cy.wait(5000)
        ClickButtonByText("Form Templates");
        CopyFormTemplate("Action Form")
        EditFormName("Copied Action - test");
        CheckContains("Copied Action - test")
    })

    it("14.Create form from homepage - 9415", () => {
        SignIn()
        cy.wait(5000)
        ClickButtonByText("Development Plan")
        cy.wait(5000)
        CheckContains("Create")
        ClickButtonByText("Create")
        CheckContains("Pending")
    })

    it("15.Close Hazard Form after creation - 9414", () => {
        SignIn()
        cy.wait(3000)
        ClickButtonByText("Report a Hazard")
        cy.wait(5000)
        ClickButtonByText("Create")
        cy.get('div > .default-dwidth > .col-12 > .dialog-header-content > .fa').click()
        cy.wait(13000)
        cy.wait(13000)
        cy.wait(13000)
        //CheckTextNotVisible("loading, please wait...")
        cy.contains("Bulk Create").should("not.exist")
    })


    it("16.Accident form type creates an accident tracking instance - 9502", () => {
        SignIn(1500, 900);
        cy.wait(5000)
        SwitchToUser('NZY Admin', 'Nicola SMITH (6147)-P');
        cy.wait(5000)
        ClickButtonByText("Report an Accident");
        CreateReportanAccidentForm();
        cy.wait(3000);
        CheckTextNotVisible('loading home, please wait')
        ClickButtonByText('Accident Tracking');
        ConfirmReportAnAccident();
    })

    it("17.Add critical risk to accident form - 9554", () => {
        SignIn(1500, 900)
        // Load accident tracking module
        ClickButtonByText('Accident Tracking')
        cy.wait(1000)
        CheckTextNotVisible("loading, please wait...")
        // Click add button
        cy.get('.col-12 > .table > thead > tr > .green-td-cell').click()
        cy.wait(1000)
        CheckTextNotVisible("loading, please wait...")
        // Select Critical Risk
        cy.get('#AccidentGeneralCommunication1 > .row > .col-4 > .input-group:nth-child(8) > .form-control').select('Confined space')
        cy.wait(1000)
        // Click save
        cy.get('.btnTick > .btn-text-width').click();
        cy.wait(2000)
        CheckContains("Confined space")
    })

    it("18.Hazard form creates instance in Hazard Risk Register module when submitted - 9501", () => {
        SignIn(1500, 900)
        ClickButtonByText("Report a Hazard")
        cy.wait(5000)
        ClickButtonByText("Create")
        cy.wait(2000)
        ClickButtonByText("Submit")
        cy.wait(2000)
        ClickButtonByText('Approve')
        cy.get('div > .default-dwidth > .col-12 > .dialog-header-content > .fa').click()
        cy.wait(13000)
        //CheckTextNotVisible("loading, please wait...")
        cy.wait(2000)
        cy.get('.ml-10 > .accordion > #modules > .col-6:nth-child(12) > .home-kiosk-block').click()
        cy.wait(1000)
        CheckTextNotVisible("loading, please wait...")
        CheckContains("Hazard created by Cypress Integration tests")
    })
});
