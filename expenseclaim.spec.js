import { SignIn } from './helpers/general'
import { LoadExpenseClaimModule, AddMileageClaim, AddEntertainmentClaim, AddFlightClaim, AddExpenseClaim, AddGeneralClaim } from './helpers/expenseclaim'

describe("Expense Claim Integration Tests", () => {

    it("1.Add flight item to expense claim", () => {
        SignIn()
        LoadExpenseClaimModule();
        AddExpenseClaim()
        AddFlightClaim("auckland", "london", "17", "test", "AUK", "LON", "17", "test")
    })

    it("2.Add general item to expense claim", () => {
        SignIn()
        LoadExpenseClaimModule()
        AddExpenseClaim()
        AddGeneralClaim("10.00", "test", "8.70", "1.30")
    })

    it("3.Add entertainment item to expense claim", () => {
        SignIn()
        LoadExpenseClaimModule()
        AddExpenseClaim()
        AddEntertainmentClaim("10.00", "test")
    })

    it("4.Add mileage item to expense claim", () => {
        SignIn()
        LoadExpenseClaimModule()
        AddExpenseClaim()
        AddMileageClaim("matamata", "hamilton", "test", "100000", "100040", "40")
    })

    it("5.Add all items to expense claim", () => {
        SignIn()
        LoadExpenseClaimModule()
        AddExpenseClaim()
        AddMileageClaim("matamata", "hamilton", "test", "100000", "100040", "40")
        AddEntertainmentClaim("10.00", "test2", "8.70", "1.30")
        AddEntertainmentClaim("10.00", "test3")
        AddFlightClaim("auckland", "london", "17", "test4", "AUK", "LON", "17", "test4")
    })


})