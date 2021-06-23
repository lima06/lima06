import { SignIn, SwitchToUser, ClickButtonByText, GoHome, CheckContains, XHRWait, GetElementNoIndex, SignOut,CloseCheckinPopup, SignInUser} from "./helpers/general"
import { ChangeContract, EnterExitSurveyDetails, EnterTerminationChecklistDetails, CheckSurveyPopulation, CheckSurveyFormPopulated, EditDescription, CheckSortedStatus, SortStatus, LoadNotificationTab } from "./helpers/exitsurvey";
import { SearchUser, SignInAsUser } from "./helpers/useraccessroles";
import { SearchForm, AddNotification, LoadCommunicationTab } from "./helpers/formtemplate";
import { SignInasUser } from "./helpers/hazardriskregister";

describe("Exit Survey Integration Tests - 10692", () => {

    it('Terminate an employee', () => {
        SignIn(1440, 900);
        SwitchToUser('G&S Store', 'Tyler ROSE (4830)-C');
        cy.wait(4000)
        ClickButtonByText('Staff Details');
        ChangeContract()//Resigned
        GoHome()
        cy.wait(4000)
        SignOut
 
    })
    it('Terminated employee complete the survey and submit. ', () => {
        
        //sign in  as Taylor rose


        SignInUser('Tyler.ROSE@unittestdb', 'Zambion@1')
        //CloseCheckinPopup()

        cy.wait(20000)
        XHRWait();
        cy.get('#tab_0 .notification-item-img').click();
        CheckContains('Survey Questions')
        CheckContains('1. Exit Survey Questions')
    })
    it('Check if the survey form is populated. - 10696', () => {
        SignIn(1440, 900);
        ClickButtonByText('Exit Surveys Management');
        cy.wait(3000)
        cy.get('tr:nth-child(1) .fa').click();
        CheckSurveyFormPopulated();
    })

    it('Edit the description of the exit survey from form templates. - 10697', () => {
        SignIn(1440, 900);
        ClickButtonByText('Form Templates');
        SearchForm('Exit Survey');
        EditDescription();
        GoHome()
        cy.wait(4000);
        ClickButtonByText('Exit Surveys Management')
        cy.wait(4000)
        CheckContains('This Is Test Description for Exit Survey')
    })

    it('Check if the management status is sorted according to the status dropdown - 10698', () => {
        SignIn(1440, 900);
        cy.wait(4000);
        ClickButtonByText('Exit Surveys Management');
        SortStatus('Open')
        CheckSortedStatus('Open');
        SortStatus('Closed')
        CheckSortedStatus('Closed');
    })

    


})