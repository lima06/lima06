import { SignIn, ClickButtonByText, CheckNotContains, CheckTextNotVisible } from './helpers/general'
import { CreateBandingTable, DeleteBandingtable, FillTableElement, CheckLevelOrder } from './helpers/bandingtable'

describe("Banding table Integration Tests", () => {

    function Setup() {
        SignIn();
        cy.wait(2000);
        ClickButtonByText("Banding Table");
    }


    it("Create and Delete Banding Table - 6096", () => {
        Setup();
        CreateBandingTable(2021, "test");
        DeleteBandingtable();
    });

    it("Edit Banding Table - 6098", () => {
        Setup();
        CreateBandingTable(2022, "test");
        FillTableElement(1, 32000, 16000);
        CheckNotContains("Missing");
    });

    it("Banding Table - Levels in order - 7872", () => {
        Setup();
        cy.wait(3400)
        CreateBandingTable(2023, "Test");
        FillTableElement(1, 50000, 50000);
        FillTableElement(5, 20000, 20000);
        FillTableElement(10, 30000, 30000);
        FillTableElement(15, 50000, 50000);
        CheckLevelOrder();
    })

})