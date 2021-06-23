import { SignIn, ClickButtonByText, CheckTextNotVisible, CheckNotContains, CheckContains } from "./helpers/general"
import { CheckStaffTable, SendMessage, CheckMessageList, AddOneOff, AddAllStaff, AddStaffByDepartment, Message, AddStaffIndividually,AddByDesignation, AddStaffByGroup, AddOneOffAddressGroup, CheckGroupTable, AddGroup, ScheduleMessage,AddSign,AddStaffInGroup} from "./helpers/staffmessaging";

describe("Staff Messaging Integration Tests", () => {
   
    it('1.Send Email to multipe staffs using staff messaging (Private Email) - 11287', () => {
        SignIn(1440, 900);
        ClickButtonByText('Staff Messaging');
        cy.wait(4000)
        cy.get('#staffMessaging_btnAddMessage').click(); // click on Add
        Message('Mail subject', 'Test mail content', 'Lydia')
        AddStaffIndividually('Adam', 'Email Address(Private)')//adding recipients
        AddStaffIndividually('Wayne Moore', 'Email Address(Private)');
        cy.wait(2000)
        SendMessage();
        CheckStaffTable('2','Wayne', 'Mail subject', 'Email', 'Queued', null); //Queued status
       
    })

    it('2.Send an Email to a staff- Pending- queued - 11287', () => {
        SignIn(1440, 900);
        ClickButtonByText('Staff Messaging');
        cy.wait(4000)
        cy.get('#staffMessaging_btnAddMessage').click(); // click on Add
        Message('Mail subject', 'Test mail content', 'Lydia')
        AddStaffIndividually('Claire', 'Email Address(Private)')
        cy.wait(2000)
        cy.get('.close-footer-btn').click();
        cy.wait(4000)
        CheckStaffTable('1','Claire', 'Mail subject', 'Email', 'Pending'); // pending status
        cy.get('tr:nth-child(1) #staffMessaging_btnEditMessage').click();
        SendMessage();
        CheckStaffTable('1','Claire', 'Mail subject', 'Email', 'Queued'); //Queued status
    })
    it('3.Test Add staff members individually (work email) - schedule message - 11290', () => {
        SignIn(1440, 900);
        ClickButtonByText('Staff Messaging');
        cy.wait(4000)
        cy.get('.green-td-cell').click();
        Message('Test Subject', 'TEST Content', 'Phillip')
        AddStaffIndividually('Emma DOYLE', 'Email Address (Work)');
        
        CheckMessageList('1', 'Emma DOYLE', 'Pending', 'G&S Supply Chain & Finance', 'Sales & Production Administrator');
        ScheduleMessage('25/12/2021', '10.15');
        cy.get('#staffMessagingDlg_btnCloseTop').click();//close
        CheckStaffTable('1','Emma', 'Test Subject', 'Email', 'Queued','25/12/2021 10:15:00'); //Queued status
    })



    it('4.Test Add staff by designation type of adding messaging recipients - 11291', () => {
        SignIn(1440, 900);
        ClickButtonByText('Staff Messaging');
        cy.wait(4000);
        cy.get('#staffMessaging_btnAddMessage').click(); // click on Add
        Message('Mail subject', 'Test mail content', 'Lydia')
        AddByDesignation('Accounts Administrator')
        CheckMessageList('1', 'Latania LEACH', 'Pending', 'TPH - Administration', 'Accounts Administrator');
        CheckMessageList('2', 'Louise WING', 'Pending', 'TPH - Administration', 'Accounts Administrator');
        CheckMessageList('3', 'Nicola SMITH', 'Pending', 'NZY Admin', 'Accounts Administrator');
        SendMessage();
        
    })

    it('5.Test add one off address type of adding messaging recipients - 11292', () => {
        SignIn(1440, 900)
        ClickButtonByText('Staff Messaging')
        cy.wait(4000)
        cy.get('#staffMessaging_btnAddMessage').click(); // click on Add
        cy.wait(3000)
        Message('Test', 'TEST','Lydia')
        cy.wait(2000)
        AddOneOff('Email', 'xxxxasdas@dfdas.com', 'Cypress Test')
        AddOneOff('SMS', '0231654061', 'Cypress Test')
        CheckMessageList('1', 'Cypress Test', 'Pending', '<oneoff>', '<oneoff>');
        CheckMessageList('2', 'Cypress Test', 'Pending', '<oneoff>', '<oneoff>');
    })

    it('7.Test Add staff by department type of Adding Messaging recipients - 11295', () => {
        SignIn(1440, 900);
        ClickButtonByText('Staff Messaging');
        cy.wait(4000)
        cy.get('#staffMessaging_btnAddMessage').click(); // click on Add
        cy.wait(3000);
        Message('CypressTest Subject', 'CypresTest Mail content','Phillip');
        cy.wait(2000)
        cy.wait(4000)
        AddStaffByDepartment('CP Wool Monthly')
        cy.wait(4000)
        CheckMessageList('1', 'Paul RABONE', 'Pending', 'CP Wool Monthly', 'Regional Manager')
        CheckMessageList('2', 'William OLIVER', 'Pending', 'CP Wool Monthly', 'Director')
    })
    
    it('8.Test Add staff by group type of adding messaging recipients - 11294', () => {
        SignIn(1440, 900);
        ClickButtonByText('Staff Messaging');
        cy.wait(4000)
        cy.get('#staffMessaging_btnAddMessage').click(); // click on Add
        cy.wait(3000)
        Message('CypressTest', 'CypresTest email content', 'Phillip');
        cy.wait(2000)
        AddStaffByGroup('Testing group1', 'group created for testing purpose');
        cy.get(':nth-child(5) > [style="margin-top: 30px; margin-bottom: 30px;"] > :nth-child(1) > .default-dwidth > ux-dialog-header.au-target > .dialog-header-content > .fa').click(); //close
        AddGroup('Testing group1');
        CheckMessageList('1', 'Sarah', 'Pending', 'LIV Saleyard', 'Saleyard Administrator')

    })
    it('9.Test for deleting the message. - 11297', () => {
        SignIn(1440, 900)
        ClickButtonByText('Staff Messaging')
        cy.wait(4000)
        cy.get('#staffMessaging_btnAddMessage').click(); // click on Add
        cy.wait(3000);
        Message('CypressTest', 'IM NOT IRON MAN', 'Lydia');
        cy.wait(2000)

        AddStaffIndividually('Douglas CARLSON')
        cy.get('#staffMessagingDlg_btnDelete > .btn-text-width').click();//delete //Discard
        cy.get('#staffMessaging_txtSearchMessages').type('douglas');
        cy.wait(3000);
        CheckTextNotVisible('CARLSON')
        //cy.get('#tab_0 > .zambion - content > router - view.au - target > .full - height').should('not.contain', 'Douglas CARLSON')

    })

    it('10.Verify user is able to edit/add Email signature -12784 ', () => {
        SignIn(1440, 900)
        ClickButtonByText('Staff Messaging')
        cy.wait(4000)
        cy.get('#staffMessaging_btnAddMessage').click(); // click on Add
        AddSign('signature', 'thank you')

        cy.get('#staffMessaging_btnAddMessage').click(); // click on Add
        Message('Test Subject', 'mail content', 'signature')
        AddStaffIndividually('Adam', 'Email Address(Private)')//adding recipients
        cy.wait(2000)
        SendMessage();
        CheckStaffTable('1', 'Adam', 'Test Subject', 'Email', 'Queued', null); //Queued status
    })

   
    it('11.Verify user is able to remove all added recipients via delete container -12792 ', () => {
        SignIn(1440, 900)
        ClickButtonByText('Staff Messaging')
        cy.wait(4000)
        cy.get('#staffMessaging_btnAddMessage').click(); // click on Add
        cy.wait(3000);
        Message('CypressTest', 'IM NOT IRON MAN','Phillip');
        cy.wait(2000)
        AddStaffIndividually('Gary Clement')
        AddStaffIndividually('Robyn Bain')
        cy.get('#staffMessagingDlg_btnDeleteAllRecipient').click(); //Discard
      
    })

    it('6.Test Add all staff type of adding messaging recipients - 11293', () => {
        SignIn(1440, 900)
        ClickButtonByText('Staff Messaging');
        cy.wait(4000);
        cy.get('#staffMessaging_btnAddMessage').click(); // click on Add
        cy.wait(2000);
        Message('CypressTEst', 'CypresTEst', 'Lydia');
        AddAllStaff();
        cy.get('#staffMessagingDlg_txtSearchRecipient').type('thomas smith');
        cy.wait(4000);
        cy.get('.p-10 > .card > .table > .table-cell-sm-text > tr > :nth-child(3)').contains('Thomas SMITH')

    })
})