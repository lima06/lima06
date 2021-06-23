import { SignIn, ClickButtonByText, TimesheetToPending, ApproveTimesheet, CheckContains, CheckNotContains, GetElement, ElementFind, ClickButtonByElement, GetDateArray, XHRWait, GetElementNoIndex, SwitchToUser, CheckTextNotVisible, GoHome, AddCostCode } from './helpers/general'
describe("Timesheet Integration Tests", () => {

    function Setup() {
        SignIn()
        SwitchToUser("CHC Admin/Mgmt", "Ella RADFORD (343)-F")
        ClickButtonByText('Timesheets')
       //CheckTextNotVisible("loading, please wait...")
        cy.wait(12800)
        cy.wait(25000)
        //TimesheetToPending()
    }

    function GetDate() {
        var dateArray = GetDateArray()
        return dateArray.Day + " " + dateArray.Month + " " + dateArray.Date
    }
   
    it("1.Toggle Single Shift Approval - 6145", () => {
        Setup()
        cy.wait(4000)
        cy.get(".au-target.table-cell.fixed-cell.ts-fixed-cell1").find("[type=checkbox]").first().check()
        cy.wait(4000);
        ElementFind(GetElement(".au-target.table-cell.fixed-cell.ts-fixed-cell1"), "[type=checkbox]").check()
        cy.get('.btn-green:nth-child(3) > div').click();
        cy.wait(15000)
        //CheckTextNotVisible('approving the timesheet. please wait..')
        CheckContains("Approved")
        cy.wait(4000)
        ElementFind(GetElement(".au-target.table-cell.fixed-cell.ts-fixed-cell1"), "[type=checkbox]").uncheck()
        cy.wait(4000)
        ElementFind(GetElement(".au-target.table-cell.fixed-cell.ts-fixed-cell1"), "[type=checkbox]").check()
        cy.wait(4000)
        cy.get('.btnEdit > div').click() //Click Review Selected
        cy.wait(4000)
        //CheckTextNotVisible("Approved")
       // cy.contains("Approved").should("not.be.visible")
    })

    it("2.Toggle approval of all shifts in timesheet - 6147", () => {
        Setup()
        cy.get('#tab_0 .fa-caret-left').click()
        //CheckTextNotVisible("Approved");
        //cy.contains("Approved").should("not.be.visible")
        ApproveTimesheet()
        //CheckTextNotVisible("Pending")
        //cy.contains("Pending").should("not.be.visible")
        cy.get('.table > .thead > .au-target > .au-target:nth-child(1) > .au-target').click()
        TimesheetToPending()
    })

    it("3.Update Base Roster - 6148", () => {
        Setup()
        cy.wait(4000)
        ClickButtonByText("Base Roster")
        cy.wait(5000)
        cy.get('tr:nth-child(3) .fa-pencil').click();
        cy.wait(5000)
        cy.get('tr:nth-child(3) > .text-center:nth-child(6) .form-control').select('1530-1700 (15:30-17:00)');
        cy.wait(5000)
        cy.get('tr:nth-child(3) .fa-check').click();
        cy.wait(4000)
        ClickButtonByText("Close")
        cy.wait(4000)
        ClickButtonByText("Sync Base")
        cy.wait(4000)
        cy.get('.btnRefresh:nth-child(1) > div').click(); //Click Sync Base Roster
        cy.wait(6000)
        ClickButtonByText("Refresh")
        cy.wait(4000)
        CheckContains("1530-1700", 40000)
    })

    it("4.Add invalid shift to base roster - 6149", () => {
        Setup()
        ClickButtonByText("Base Roster")
        CheckContains("Every week")
        var button = GetElement(".green-td-cell.text-center.au-target")
        ClickButtonByElement(button)
        cy.get(".fa.fa-pencil.table-control-height.green-text.border-radius4.btn-sm-yellow-action.flex-item.au-target")
            .first().get(".form-control.text-sm.au-target").eq(4).select("1530-1700 (15:30-17:00)")
        ClickButtonByElement(GetElement(".fa.fa-check.table-control-height.green-text.border-radius4.btn-sm-yellow-action.flex-item.au-target"))
        CheckContains("saving the roster base schedule - Mon Weekly")
        var cancelButton = GetElement(".fa.fa-times.table-control-height.red-text-important.border-radius4.btn-sm-yellow-action.flex-item.au-target")
        ClickButtonByElement(cancelButton)
        ClickButtonByText("Close", 5000)
    })
    

    it("5.Add location - 6150", () => {
        Setup()
        ClickButtonByText("Locations")
        cy.get('.au-target > .col-2 > .col-12 > .col-12 > .fa').click()

        cy.get('.dialog-container > .au-target > .col-2 > .col-12 > .col-12').click()
        GetElementNoIndex('.row > .row > .col-6:nth-child(1) > .input-group:nth-child(2) > .form-control').type('added_location')
        GetElementNoIndex('.row > .row > .col-6:nth-child(2) > .input-group > .form-control').type('added_code')

        cy.get('.dialog-container > .col-12 > .btn-group > .button:nth-child(1) > .btn-text-width').click()
        CheckContains("added_location")
    })

    it("6.Add Day - 6151", () => {
        Setup()
        ClickButtonByText("Add Day")
        GetElementNoIndex('.row.col-12.p-0.height100').find(".form-control.au-target").first().select(GetDate())//Day of week
        GetElementNoIndex('.row.col-12.p-0.height100').find(".gj-timepicker.gj-timepicker-md.gj-unselectable").first().type("02:00")//Start time
        GetElementNoIndex('.row.col-12.p-0.height100').find(".gj-timepicker.gj-timepicker-md.gj-unselectable").eq(1).type("04:00") //end time
        cy.get('.input-group:nth-child(4) > .form-control:nth-child(1)').select('Zambion');//Location
       // GetElementNoIndex('.dialog-container > .row > .col-4 > .input-group:nth-child(4) > .form-control').select('Zambion')
        cy.wait(2000)
        ClickButtonByElement(GetElement(".button.btn-green.btnTick.mr-10.au-target"))
        ClickButtonByText("Refresh")
        
        CheckContains("2.00")
    })
    
    it("7.Remove shift from base roster - 6152", () => {
        Setup()
        SwitchToUser("IRR Parts", "Warren DEUART (6055)-F")
        ClickButtonByText("Sync Base")
        cy.wait(4000)
        cy.get('.btnRefresh:nth-child(1) > div').click(); //Click Sync Base Roster
        GetElement(".au-target.table-row.fixed-column.ts-fixed-col1").contains("Mon")
        cy.wait(4000)
        ClickButtonByText("Base Roster")
        GetElementNoIndex('.table-cell-sm-text > tr:nth-child(1) > .text-center > .d-flex:nth-child(1) > .fa:nth-child(2)').click()
        ClickButtonByText("Close")
        ClickButtonByText("Sync Base")
        cy.wait(13000)
        //CheckTextNotVisible("working, please wait...")
        ClickButtonByText("Clear")
        cy.get(".float-left.button.btn-green.btnRefresh.mr-10.au-target").click()
        cy.wait(18000)
        //CheckTextNotVisible("loading, please wait", 50000)
        cy.wait(5000)
        CheckContains('/^Mon\w+/').should('not.exist')
    })
  

    it("8.Add Caller ID to Location - 6153", () => {
        Setup()
        cy.wait(4000)
        ClickButtonByText('Locations')
        cy.wait(4000)
        cy.get('.nav-item:nth-child(3)> .nav-link').click();
        ClickButtonByText('Add Caller ID')
        cy.wait(4000)
        cy.get('.float-left > .form-control').click();
        cy.get('.float-left > .form-control').type('6478819100');
        cy.get('.btnTick:nth-child(2) > .btn-text-width').click();
        CheckContains("Saved", 1000)
        CheckContains("CLI 6478819100")
    })
 
    it("9.Create Roster Skill level - 6154", () => {
        Setup()
        ClickButtonByText("Roles")
        ClickButtonByText("Roster Skill Levels")
        cy.wait(4000)
        GetElementNoIndex('.au-target > .row > .col-12 > .button > .btn-text-width').click()//Click Skill/Abilities Definition
        cy.wait(4000)
        CheckContains("Skill Definitions")
        //GetElementNoIndex('.au-target > .col-3 > .col-12 > .col-12 > .fa').click()
        
        cy.get('.col-12:nth-child(2) > .fa').click();//Click on + sign
        cy.wait(4000)
        cy.get('#skillAbilityDefinitionDlg_txtSkillName').clear()
        cy.get('#skillAbilityDefinitionDlg_txtSkillName').type('test1');

        //etElementNoIndex('.au-target > .col-9 > .col-12 > .input-group:nth-child(2) > .form-control').click()
        //GetElementNoIndex('.au-target > .col-9 > .col-12 > .input-group:nth-child(2) > .form-control').clear()
       // GetElementNoIndex('.au-target > .col-9 > .col-12 > .input-group:nth-child(2) > .form-control').type('test')
        cy.get('.form-control:nth-child(4)').clear();
        cy.get('.form-control:nth-child(4)').type('Testgroup');// Comments
        cy.get('#skillAbilityDefinitionDlg_btnSave > .btn-text-width').click();//Save
        cy.wait(3000)
        cy.get('#skillAbilityDefinitionDlg_btnClose_1').click();//Close
        //Assign skill level
        cy.wait(4000)
        cy.get('div > .fa-plus').click({ multiple: true });//Add
        cy.get('td .form-control').select('test1');// select the skill added above
        cy.get('td:nth-child(3)').click();
        cy.get('.fa-check').click();


        //GetElementNoIndex('.active:nth-child(4) > div:nth-child(1) > div:nth-child(1) > .au-target:nth-child(1) > .col-12:nth-child(2) > .dialog-container:nth-child(1) > .col-12:nth-child(1) > .btn-group:nth-child(1) > .button:nth-child(1) > .btn-text-width:nth-child(1)').click()
    })

    it("10.Toggle Excluded Timesheet - 6155", () => {
        Setup()
        SwitchToUser("CHC Parts", "Callum DAVIDSON (331)-F")
        cy.wait(25000)
        ClickButtonByText("Excluded")
        CheckNotContains("Pending")
        CheckNotContains("Approved")
        ClickButtonByText("Included")
        CheckContains("Pending")
    })

    it("11.Cost code populating on shifts page under cost to dropdown - 9054", () => {
        SignIn(1440, 900)
        SwitchToUser('CHC Admin/Mgmt', 'Ella RADFORD (343)-F')
        ClickButtonByText('Finance GL / Cost Codes')
        AddCostCode('00.00.', 'Test123', 'Department: CHC Admin/Mgmt')
        GoHome()
        cy.wait(4000)
        ClickButtonByText('Timesheets')
        cy.wait(8000)
        ClickButtonByText('Base Roster')
        cy.wait(4000)
        ClickButtonByText('Shifts')
        cy.wait(4000)
        cy.get('.col-12 > .nav-item:nth-child(2) > .nav-link').click({force: true}) // Load Advanced Tab
        cy.wait(5000)
        cy.get('.col-12:nth-child(1) > .flex-item > .input-group:nth-child(2) > .form-control').select('(00.00.) Test123 (CHC Admin/Mgmt)').should('to.contain', '(00.00.) Test123 (CHC Admin/Mgmt)') // Check whether the dropdown contains drop down
    })
})