import { SignIn, ClickButtonByText, SwitchToUser, CheckContains, CheckNotContains, XHRWait, ClickButtonByElement, ElementFind, GetElement, GetElementNoIndex, CheckTextNotVisible } from './helpers/general'

describe("Payslip Integration Tests", () => {

    function Setup() {
        SignIn()
        ClickButtonByText('Payslips')
    }

    function ValidatePayslipRow(rowNum, rowName, rowVal) {
        cy.get(".table.table-padding.table-hover.table-cell-sm-text.col-12.m-0").eq(rowNum).find("td").eq(0).contains(rowName)
        cy.get(".table.table-padding.table-hover.table-cell-sm-text.col-12.m-0").eq(rowNum).find("td").eq(3).contains(rowVal)
    }

    it("Export payslip - 6156", () => {
        Setup()
        SwitchToUser("CHC Admin/Mgmt", "Ella RADFORD (343)-F")
        cy.wait(4000)
        var button = cy.get(".button.btnExportPDF.btn-green.float-right.ml-10.au-target").eq(0)
        ClickButtonByElement(button)
        CheckContains("payslip.pdf")
    })

    it("Add and remove payment - 6158", () => {
        Setup()
        SwitchToUser("Contracting", "Megan NESS (4706)-F")
        // Add payment
        CheckContains("4706 Megan NESS")
        cy.wait(7000)
        CheckContains("Refresh")
        ClickButtonByText("Payment")
        cy.wait(7000)
        ElementFind(GetElement(".input-group.col-12"), ".form-control.red-border-input.au-target").select("Phone Allowance")
        CheckContains("Phone Allowance")
        
        GetElement(".input-group.au-target > .form-control.au-target", 3).select("(00.00) TPH Administration")
        CheckContains("TPH Administration")
        GetElement(".form-control.au-target", 3).type("test")
        cy.get('.au-target > .col-6 > .au-target:nth-child(5) > .input-group > .form-control').type("32.00")
        ClickButtonByText("Save")
        cy.wait(7000)
        cy.get('.au-target > .alert:nth-child(2) > .btn-group > .button:nth-child(2) > .btn-text-width').click()
        cy.wait(85000)
        // Check payment was added
        cy.get('.col-10')
            .should('contain', 'Phone Allowance (test) (non-taxable)')
        
        // Delete payment
        GetElement(".fa.fa-trash", 2).click()
        cy.wait(4000)
        ClickButtonByText(/^Delete$/)
        cy.wait(35000)
        //CheckTextNotVisible("loading, please wait...")
        cy.get('.au-target > .alert:nth-child(2) > .btn-group > .button:nth-child(2) > .btn-text-width').click()
        //CheckTextNotVisible("updating payslip", 60000)
        // Check payment was deleted
        cy.wait(75000)  
        CheckContains("Phone Allowance (test) (non-taxable)").should("not.exist")
    })

    it("Add and remove deduction - 6159", () => {
        Setup()
        SwitchToUser("Contracting", "Bradley (Headzy) HEADS (4109)-F")
        cy.wait(3000)
        ClickButtonByText("Deduction")
        cy.wait(3000)
        ElementFind(GetElement(".col-12.p-0.d-flex"), ".form-control.red-border-input.au-target").select("Child Support")
        
        GetElement(".input-group.au-target > .form-control.au-target", 3).select("(00.00) TPH Administration")
        
        GetElement(".form-control.add-on-inputs.red-border-input.au-target").type("32.00")
        
        ClickButtonByText("Save")
        cy.wait(3000)
        cy.get('.au-target > .alert:nth-child(2) > .btn-group > .button:nth-child(2) > .btn-text-width').click()
        CheckContains("updating")
        CheckTextNotVisible("updating", 60000)
        // Assert deduction was added
        CheckContains("Child Support")
        cy.wait(16000)
        
        // Delete deduction
        cy.get('div:nth-child(7) > .table > tbody > tr > td > div > .badge:nth-child(1) > .fa').click()
        cy.wait(8000)
        ClickButtonByText("Delete")
        cy.wait(15000)
        //CheckTextNotVisible("loading, please wait...")
        cy.get('.au-target > .alert:nth-child(2) > .btn-group > .button:nth-child(2) > .btn-text-width').click()
        cy.wait(36000)
        //CheckContains("updating")
        //CheckTextNotVisible("updating", 60000)
        // Assert deduction was deleted
        CheckNotContains("Child Support")
    })    

    it("Add multiple payments to payslip", () => {
        Setup()
        SwitchToUser("Contracting", "Gerald MCKERCHAR (6106)-F")
        // Add first payment
        var button = GetElement(".alert.p-10.white-background.vertical-center-parent.au-target")
        button = ElementFind(button, ".button.btnAdd.btn-purple-deluge-fill.ml-10.au-target")
        ClickButtonByElement(button)
        ElementFind(GetElement(".input-group.col-12"), ".form-control.red-border-input.au-target").select("Phone Allowance")
        CheckContains("Phone Allowance")
        GetElement(".input-group.au-target > .form-control.au-target", 3).select("(00.00) TPH Administration")
        CheckContains("TPH Administration")
        GetElement(".form-control.au-target", 3).type("test")
        cy.get('.au-target > .col-6 > .au-target:nth-child(5) > .input-group > .form-control').type("32.00")
        ClickButtonByText("Save")

        cy.wait(6000)

        // Add second payment
        button = GetElement(".alert.p-10.white-background.vertical-center-parent.au-target")
        button = ElementFind(button, ".button.btnAdd.btn-purple-deluge-fill.ml-10.au-target")
        ClickButtonByElement(button)
        ElementFind(GetElement(".input-group.col-12"), ".form-control.red-border-input.au-target").select("Redundancy Notice")
        GetElement(".input-group.au-target > .form-control.au-target", 3).select("(00.00) TPH Administration")
        GetElement(".form-control.au-target", 3).type("test")
        cy.get('.au-target > .col-6 > .au-target:nth-child(5) > .input-group > .form-control').type("32.00")
        ClickButtonByText("Save")
        cy.wait(6000)
        cy.get('.au-target > .alert:nth-child(2) > .btn-group > .button:nth-child(2) > .btn-text-width').click()
        cy.wait(8000)
        //CheckTextNotVisible("loading, please wait", 60000)
        cy.wait(6000)
       // CheckTextNotVisible("updating", 60000)
        // Check payments were added
        CheckContains("Phone Allowance (test) (non-taxable)")
        CheckContains("~Redundancy Notice (test)")
    })

})