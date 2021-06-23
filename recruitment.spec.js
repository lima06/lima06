import { ClickButtonByText, XHRWait, CheckContains, SignIn, SignInUser, CheckTextNotVisible, CheckNotContains, GoHome, SignOut } from "./helpers/general"
import { LoadRecruitmentPlugin, LoadRecruitmentTab, CreateVacancy, LoadDashboardTab, ChangeProcessAction, ApplyVacancy, EnterFirstFormDetails, EnterApplicationFormDetails, LoadApplicantPoolTab, CheckInApplicantPoolTableForApplicant, CreateApplication, AddCandidateFromApplicantPool, TransferApplication, CheckRecruitmentTable, SearchApplicant, CreateProcessAction, LoadProcessActionTab, LoadProcess, AddProcessActionToProcess, CheckCommunicationHistortyTable, AddApplication, AddAllVariable, HireCandidate, DeclineCandidate, ArchiveCandidate, AddOnbordingForm, CheckAssociatedFormTable, SearchCandidateInRecruimentTab, LoadRecruitmentSetting, ChangeEmployeeLinkingThreshold, CheckStatusInRecruitmentTable, OpenCandidate, ChangeDuplicateThreshold } from "./helpers/recruitment";
import { CreateFormByManager, ATRFormDetails } from "./helpers/formtemplate";
import { SelectUserAccess, SearchUser, LoadUserAccessTab, SwitchUserAndDept } from "./helpers/useraccessroles";
import { loadUserSecurity } from "./helpers/useraccess";



describe("New Recruitment Module Integration test", () => {
    
    it('1.Create three vacancy - 11610', () => {
        SignIn(1440, 900);
        ClickButtonByText('Recruitment');
        LoadRecruitmentTab()
        CreateVacancy('Hybrid Specialist', 'Application Form', 'Hybrid Specialist', 'Employment Form')
        cy.wait(4000)
        cy.get('.au-target > .au-target > .text-lg').contains('Hybrid Specialist');
        CreateVacancy('Administrator', 'Application Form', 'Administrator', 'Employment Form')
        cy.wait(4000)
        cy.get('.au-target > .au-target > .text-lg').contains('Administrator');
        CreateVacancy('Engineer', 'Application Form', 'Engineer', 'Employment Form')
        cy.wait(4000)
        cy.get('.au-target > .au-target > .text-lg').contains('Engineer');
        LoadDashboardTab();
        cy.wait(4000);
        CheckContains('Hybrid Specialist')
        CheckContains('Administrator')
        CheckContains('Engineer')

    })
 
    it('2.Continued - 11610', () => {
        LoadRecruitmentPlugin()
        //cy.visit('https://plugins.zambion.com/#/JobVacancies?id=092b6548-fe2a-40eb-b63d-38907b61ad3c');
        cy.wait(20000)
        XHRWait()
        cy.get('.table-container .job-name').contains('Hybrid Specialist');
        cy.get('.table-container .job-name').contains('Administrator');
        cy.get('.table-container .job-name').contains('Engineer');
    })

    it('3.Apply the vacancy and enter the details in the application form and submit - 11614', () => {
        LoadRecruitmentPlugin()
        cy.wait(4000);
        XHRWait();
        CheckTextNotVisible('loading, please wait...')
        ApplyVacancy('2');
        EnterFirstFormDetails('Bruce', 'BANNER', 'bruce@banner.com', '123123')
        EnterApplicationFormDetails('123street', 'Melvile', 'Hamilton', '27', '57000', '30/09/2022', '1200', 'Four Weeks')
        cy.wait(4000);
        LoadRecruitmentPlugin()
        cy.wait(4000);
        XHRWait();
        CheckTextNotVisible('loading, please wait...')

        ApplyVacancy('2')
        EnterFirstFormDetails('Tony', 'Stark', 'tony@stark.com', '123123123')
        EnterApplicationFormDetails('4545street', 'Vitoria', 'Hamilton', '29', '60000', '30/09/2022', '1500', 'Four Weeks')
        LoadRecruitmentPlugin()
        cy.wait(4000);
        XHRWait();
        CheckTextNotVisible('loading, please wait...')
        ApplyVacancy('4')
        EnterFirstFormDetails('Clinton', 'Barton', 'xxhawkeye@marvelcomics.com', '131335489475')
        EnterApplicationFormDetails('4545street', 'Vitoria', 'Hamilton', '29', '60000', '30/09/2022', '1500', 'Four Weeks')
        LoadRecruitmentPlugin()
        cy.wait(4000);
        XHRWait();
        CheckTextNotVisible('loading, please wait...')
        ApplyVacancy('4')
        EnterFirstFormDetails('Steve', 'Rogers', 'xxxcaptainamerica@marvelcomics.com', '131335489475')
        EnterApplicationFormDetails('4545street', 'Vitoria', 'Hamilton', '29', '60000', '30/09/2022', '1500', 'Four Weeks')
        LoadRecruitmentPlugin()
        cy.wait(4000);
        XHRWait();
        ApplyVacancy('4')
        EnterFirstFormDetails('Challa', 'Wakanda', 'xxblackpanther@marvelcomics.com', '131335489475')
        EnterApplicationFormDetails('4545street', 'Vitoria', 'Hamilton', '29', '60000', '30/09/2022', '1500', 'Four Weeks')

    })

    it('4.Continued 11614', () => {
        SignIn(1440, 900)
        cy.wait(4000)
        ClickButtonByText('Recruitment')
        LoadRecruitmentTab()
        ClickButtonByText('Administrator');
        cy.wait(4000)
        cy.get('.col-2:nth-child(3) > .input-group > .form-control').select('First Name, Last Name');
        cy.wait(2000)
        CheckRecruitmentTable('1', 'In Progress', 'Bruce BANNER', '123123', 'New')
        CheckRecruitmentTable('2', 'In Progress', 'Tony STARK', '123123123', 'New')
    })

    it('5.Create a vacancy without application form(?Note - Application form is not mandatory?) - 11636', () => { ////Under Developement****
        SignIn(1440, 900);
        cy.wait(4000)
        ClickButtonByText('Recruitment')
        LoadRecruitmentTab()
        CreateVacancy('Beekeeper', 'false', 'Beekeeper', 'Employment Form', ' ')
        cy.wait(4000)
        cy.get('.au-target > .au-target > .text-lg').contains('Beekeeper');
    })


    it('6.Create a vacancy without employment form - 11638', () => {
        SignIn(1440, 900);
        cy.wait(4000)
        ClickButtonByText('Recruitment');
        cy.wait(4000)


        LoadRecruitmentTab();
        cy.wait(4000)
        CreateVacancy('Gopher', 'Application Form', 'Gopher', 'false')
        cy.wait(4000)
        cy.get('.au-target > .au-target > .text-lg').contains('Gopher');
        LoadDashboardTab()
        cy.wait(4000)
        CheckContains('Gopher')
    })
    it('7.Apply for 2 or more vacancy and check if the applicant pool has the applicant and position applied details - 11640', () => {
        LoadRecruitmentPlugin()
        cy.wait(3000)
        XHRWait();
        ApplyVacancy('5')//hybrid specialist
        EnterFirstFormDetails('Clark', 'Kent', 'clarkthesuperman@dc.com', '12312312312')
        EnterApplicationFormDetails('4777street', 'CBD', 'Hamilton', '77', '40000', '30/09/2022', '1000', 'Four Weeks')
        LoadRecruitmentPlugin()
        ApplyVacancy('4');//Gopher
        EnterFirstFormDetails('Wanda', 'Maximoff', 'VisionWanda@marvelcomics.com', '123123123123');
        EnterApplicationFormDetails('4533street', 'Te Rapa', 'Hamilton', '21', '50000', '30/09/2022', '1200', 'Four Weeks')
        LoadRecruitmentPlugin()
        ApplyVacancy('5')//Hybrid specialist
        EnterFirstFormDetails('Vision', 'Maximoff', 'Vision@starkindustries.com', '87978909779');
        EnterApplicationFormDetails('4222street', 'Huntington', 'Hamilton', '11', '40000', '30/09/2022', '1000', 'Four Weeks')
    })
   

    it('8.Continues 11640', () => {
        SignIn(1440, 900);
        cy.wait(4000)
        ClickButtonByText('Recruitment');
        LoadApplicantPoolTab();
        CheckInApplicantPoolTableForApplicant('Clark KENT', 'Hybrid Specialist')
        CheckInApplicantPoolTableForApplicant('Vision MAXIMOFF', 'Hybrid Specialist')
        CheckInApplicantPoolTableForApplicant('Wanda MAXIMOFF', 'Gopher')
    })
    it('9.Add new applicant from applicant pool tab - 11653', () => {
        SignIn(1440, 900);
        cy.wait(4000)
        ClickButtonByText('Recruitment')
        cy.wait(5000)
        XHRWait()
        LoadApplicantPoolTab();
        AddCandidateFromApplicantPool('Scott', 'Lang', 'scott@iamantman.marvel', '123223453667')
        cy.get('.closeDialogIcon').click();

        //without tagging them to the application- not able to handle the warning message
        cy.wait(3000)
        cy.get('#bShowAppliedForActiveVacanciesOnly1').click({ force: true });
        CheckInApplicantPoolTableForApplicant('Scott LANG', '')
        //cy.get('.au-target:nth-child(2) > .text-center .fa-pencil').click();
        cy.get('.au-target > .d-flex > .fa-pencil').click();
        cy.wait(4000)
        CreateApplication('Administrator')
        cy.wait(3000)
        cy.get('.closeDialogIcon').click();
        //cy.get('.close-footer-btn').click();
        cy.wait(3000)
        CheckInApplicantPoolTableForApplicant('Scott LANG', 'Administrator')
    })

    it('10.Transfer application to a different vacancy - 11711', () => {
        SignIn(1440, 900);
        cy.wait(4000)
        ClickButtonByText('Recruitment')
        LoadApplicantPoolTab()
        TransferApplication();
    })


    it('11.Check for the status of all the forms(Pending, Submitted, Waiting Approval, Approved - 11747', () => {
        LoadRecruitmentPlugin()
        cy.wait(6000)
        ApplyVacancy('3')
        EnterFirstFormDetails('Phil', 'Coulson', 'xxxphil.coulson@shield.com', '87978909779');
        EnterApplicationFormDetails('NoLoacation', 'NOLocation', 'AIR', '33', '100000', '30/09/2022', '10000', 'Four Weeks')
    })
    
    it('12.Continued - 11747', () => {
        SignIn(1440, 900)
        cy.wait(4000)
        ClickButtonByText('Recruitment')
        LoadApplicantPoolTab();
        SearchApplicant('Phil Coulson')
        cy.wait(3000)
        XHRWait()
        cy.get('#recruitmentApplicantPool_buttonGoToApplicant_1_0').click();
        cy.get('#recruitmentApplicantDLG_buttonApplicationItem_-1_0 > .fa-pencil').click();// open the Vacancy
        XHRWait()
        cy.wait(4000)

        cy.get('.text-center > .light-purple-border').contains('Submitted');
        //cy.get('tr.au-target > .text-center > .light-purple-border').contains('Submitted');
        cy.get('.text-center:nth-child(1) > .light-purple-border').click();//Click on submitted

        ClickButtonByText('Make Pending')
        cy.wait(3000)
        cy.get('.dialog-container > .p-0 > .col-12 > .form-control').type('My wish')
        cy.wait(2000)
        cy.get('.col-12 > .top-bar-basic-style > .btn-group > .btnTick').click();

       // cy.get('.col-12 > .top-bar-basic-style > .btn-group > .btn-green').click(); //save
        cy.wait(5000)
        cy.get('.col-12 > .dialog-header-content > .fa').click();//close
        cy.wait(6000)
        XHRWait()
        cy.get('tr.au-target > .text-center > .purblue-border').contains('Pending');
        cy.get('.text-center:nth-child(1) > .purblue-border').click();
        ClickButtonByText('Submit')
        cy.wait(5000)
        cy.get('.col-12 > .dialog-header-content > .fa').click();//close
        cy.wait(5000)
        cy.get('tr.au-target > .text-center > .light-purple-border').contains('Submitted');
        cy.get('.text-center:nth-child(1) > .light-purple-border').click();
        //cy.get('tr.au-target > .text-center > .light-purple-border').click({ multiple: true });
        cy.wait(4000)
        ClickButtonByText('Approve')
        cy.wait(10000)
        XHRWait()
        cy.get('tr.au-target > .text-center > .green-border').contains('Approved');
    })
    
    it('13.Test for the process action. - 11749', () => {
        SignIn(1440, 900)
        cy.wait(4000)
        ClickButtonByText('Recruitment')
       
        LoadProcessActionTab();
        CreateProcessAction('Sent Test1', 'In Progress', 'Onboarding Form 1st Interview', 'Hi [#candidatefirstname#],{enter}We have attached a link for you.{enter}Please check it out', 'Sent Test')
        LoadProcess()
        AddProcessActionToProcess('Sent Test1')
        
        LoadRecruitmentTab();


        cy.get('.list-item-absolute-list .form-control').type('Engineer');
        cy.get('.text-center:nth-child(2) > .d-flex > .au-target').click({ force: true, multiple: true });//open application

        cy.wait(5000)
        //cy.get('#recruitmentApplicationDetailsDLG_cmbProcessActions_1').click
        cy.wait(14000)
       // ChangeProcessAction('Sent Test1', true);// need to fix it later
        cy.wait(4000)

       // CheckCommunicationHistortyTable('Engineer', 'Sent Test1', 'Cypress Integration tests')//need to fix it later

    })

    it('14. Validation on the career page and form plugin - 11764', () => {
        LoadRecruitmentPlugin()
        cy.wait(6000)
        ApplyVacancy('4');
        EnterFirstFormDetails(' ', 'Coulson', 'xxxphil.coulson@shield.com', '87978909779');
        CheckContains('The first name is required')
        EnterFirstFormDetails('Vapor', 'Cous', 'xczxczvapoert.shield.com', '87978909779');
        CheckContains('Invalid email address')
        EnterFirstFormDetails('Vapor', 'Cous', 'xczxczvapoert@shield.com', 'sadhasd');
        CheckContains('Invalid mobile phone')

    })

    it('15. Add the candidate present in the applicant pool to another vacancy - 11797', () => {
        SignIn(1440, 900)
        cy.wait(4000)
        ClickButtonByText('Recruitment')
        LoadApplicantPoolTab();
        cy.wait(2000)
        SearchApplicant('Vision')
        cy.wait(4000)
        cy.get('#recruitmentApplicantPool_buttonGoToApplicant_1_0').click();
       
        XHRWait()
        cy.wait(4000)
        AddApplication('Engineer')
        cy.get('.dialog-subtitle:nth-child(3)').contains('Vacancy Position: Engineer');
        cy.wait(16000)
        cy.get('#recruitmentApplicationDetailsDLG_buttonApplicationClose2_-1').click();

        SearchApplicant('Vision')
        cy.wait(3000)
        cy.get('.au-target > li:nth-child(1)').contains('Engineer');
        cy.get('.au-target > li:nth-child(2)').contains('Hybrid Specialist');

    })

    it('16.Test for communications history and mail merge. - 11798', () => {
        SignIn(1440, 900)
        cy.wait(4000)
        ClickButtonByText('Recruitment');
        LoadProcessActionTab()
        cy.wait(5000)
        ClickButtonByText('Unsuccessfully Shortlisted')
        AddAllVariable()
        LoadProcess()
        AddProcessActionToProcess('Unsuccessfully Shortlisted')
        LoadRecruitmentTab()
        ClickButtonByText('Gopher')
        cy.wait(5000)
        //cy.get('#recruitment_RecruitmentApplicantNode_1_0 .d-flex > .au-target').click();
        cy.get('.pl-0:nth-child(2) > .input-group > .form-control').type('Wanda');

        cy.wait(3000)
        cy.get('.text-center:nth-child(2) .fa-pencil').click();
       //cy.get('#recruitmentApplicationDetailsDLG_buttonApplicationClose2_1').click();//close

        //cy.get('#recruitmentApplicantPool_buttonGoToApplicant_1_0').click();
        cy.wait(5000)
        ChangeProcessAction('Unsuccessfully Shortlisted')
        cy.wait(5000)
        cy.get('.col-12 > .trumbowyg-box > .trumbowyg-editor').contains('xxxxxxgrant@zambion.com')
        cy.get('.col-12 > .trumbowyg-box > .trumbowyg-editor').contains('Cypress')
        cy.get('.col-12 > .trumbowyg-box > .trumbowyg-editor').contains('tests')
        cy.get('.col-12 > .trumbowyg-box > .trumbowyg-editor').contains('VisionWanda@marvelcomics.com')
        cy.get('.col-12 > .trumbowyg-box > .trumbowyg-editor').contains('Wanda')
        cy.get('.col-12 > .trumbowyg-box > .trumbowyg-editor').contains('Wanda MAXIMOFF')
        cy.get('.col-12 > .trumbowyg-box > .trumbowyg-editor').contains('MAXIMOFF')
        cy.get('.col-12 > .trumbowyg-box > .trumbowyg-editor').contains('123123123123')
        cy.get('.btn-green-fill:nth-child(6)').click();
        XHRWait()
        cy.wait(4000)
        cy.get('#RecruitmentApplicantCommunication1').contains('xxxxxxgrant@zambion.com')
        cy.get('#RecruitmentApplicantCommunication1').contains('Cypress')
        cy.get('#RecruitmentApplicantCommunication1').contains('tests')
        cy.get('#RecruitmentApplicantCommunication1').contains('VisionWanda@marvelcomics.com')
        cy.get('#RecruitmentApplicantCommunication1').contains('Wanda')
        cy.get('#RecruitmentApplicantCommunication1').contains('Wanda MAXIMOFF')
        cy.get('#RecruitmentApplicantCommunication1').contains('MAXIMOFF')
        cy.get('#RecruitmentApplicantCommunication1').contains('123123123123')
    })
    

    it('17.Test for Hire, Archive and Decline a candidate', () => {
        SignIn(1440, 900);
        ClickButtonByText('Recruitment')
        cy.wait(4000)
        LoadRecruitmentTab()
        cy.wait(18000)
        ClickButtonByText('Hybrid Specialist')
        HireCandidate()
        cy.wait(4000)
        ArchiveCandidate('1')
        cy.wait(4000)
        DeclineCandidate('1')
        cy.wait(4000)

    })

    it('18.Test All the filters and tags and numbers of the recruitment tab. - 11824', () => {
        SignIn(1440, 900)
        ClickButtonByText('Recruitment')
        LoadRecruitmentTab()
        cy.wait(4000)
        ClickButtonByText('Hybrid Specialist')
        cy.get('#bShowArchived1').click({ force: true });
        CheckStatusInRecruitmentTable('Declined')
        CheckStatusInRecruitmentTable('Archived')
        cy.get('#bShowArchived1').click({ force: true });
        cy.wait(3000)
        cy.get('#bShowHired1').click({ force: true });
        CheckStatusInRecruitmentTable('Hired')
        cy.get('#bShowHired1').click({ force: true });
    })


    it('19.Automatically create an on boarding form when a process action is applied - 11892', () => {
        SignIn(1440, 900)
        ClickButtonByText('Recruitment')
        LoadProcessActionTab();
        ClickButtonByText('1st Interview Confirmation')
        cy.wait(4000)
        AddOnbordingForm('Onboarding Form 1st Interview')
        LoadRecruitmentTab();
        cy.wait(4000)
        ClickButtonByText('Gopher');
        cy.wait(4000)
        //cy.get('tr.au-target > .height100 > .d-flex > .fa-pencil').click();
        cy.get('#recruitment_RecruitmentApplicantNode_1_0 .fa-pencil').click();

        cy.wait(4000)
        ChangeProcessAction('1st Interview Confirmation', true)
        CheckAssociatedFormTable('1', 'Pending', 'Onboarding Form 1st Interview', 'Recruitment Onboarding Form');

    })

    it('20.Once candidate is hired ? if multiple application open ? to give them an archive status - 11935', () => {
        SignIn(1440, 900)
        ClickButtonByText('Recruitment')
        LoadApplicantPoolTab()
        AddCandidateFromApplicantPool('Nick', 'Fury', 'xxxnick@shield.co.nz', '890799594369')
        AddApplication('Gopher');
        cy.get('.close-footer-btn').click();
        cy.wait(4000)
        SearchApplicant('Nick Fury')
        cy.wait(4000)
        //cy.get('.editable-text > .fa').click();
        cy.get('#recruitmentApplicantPool_buttonGoToApplicant_1_0').click();
        cy.wait(4000)
        AddApplication('Administrator')
        cy.wait(3000)
        cy.get('.close-footer-btn').click();
        cy.wait(4000)
        LoadRecruitmentTab();
        ClickButtonByText('Administrator')
        SearchCandidateInRecruimentTab('Nick Fury');
        cy.wait(3000)
        SearchCandidateInRecruimentTab('Nick Fury');
        HireCandidate('1')
        ClickButtonByText('Gopher')
        CheckNotContains('Nick Fury')
        cy.get('#bShowArchived1').click({ force: true });
        CheckContains('Nick FURY')
    })

    it('21.Approval to Recruit Form test- 11960', () => {
        SignIn(1440, 900);
        ClickButtonByText('Forms / Checklist');
        cy.wait(4000);
        CreateFormByManager('Approval to Recruit');
        ATRFormDetails('Auto Electrican', 'CHC Admin/Mgmt')
        cy.wait(4000)
        ClickButtonByText('Submit')
        cy.wait(3000)
        cy.get('.close-footer-btn').click();
        cy.wait(3000)
        GoHome()
        cy.wait(4000)
        ClickButtonByText('Recruitment')
        cy.wait(5000)
        CheckTextNotVisible('Auto Electrican')
        cy.wait(3000)
        GoHome()
        cy.wait(4000)
        cy.get('#modules > .col-6:nth-child(10) .menuName').click();
        cy.wait(3000)
        cy.get('.au-target:nth-child(1) > td .fa-pencil').click();
        cy.wait(4000)
        ClickButtonByText('Approve');
        cy.wait(4000)
        XHRWait();
        cy.wait(3000)
        GoHome()
        cy.wait(4000)
        cy.get('#modules > .col-6:nth-child(28) .menuName').click();
        cy.wait(3000)
        CheckContains('Auto Electrican')
    })
   
    it('22.Employee to candidate matching test - 11974', () => {
        SignIn(1440, 900);
        ClickButtonByText('Recruitment')
        LoadRecruitmentSetting();
        ChangeEmployeeLinkingThreshold();
        cy.wait(4000)
        XHRWait();
    })

    it('23. Continued - 11974', () => {
        LoadRecruitmentPlugin()
        cy.wait(14000);
        XHRWait();
       // CheckTextNotVisible('loading, please wait...')
        ApplyVacancy('2')
        EnterFirstFormDetails('Wayne', 'moore', 'xxElla@unittest.com', '123123')
        EnterApplicationFormDetails('123street', 'Melvile', 'Hamilton', '27', '57000', '30/09/2022', '1200', 'Four Weeks')
        cy.wait(4000);
        LoadRecruitmentPlugin()
        cy.wait(8000);
        XHRWait();
        //CheckTextNotVisible('loading, please wait...')
        ApplyVacancy('2')
        EnterFirstFormDetails('Robyn', 'Bain', 'zzzzxxella@unittest.com', '0212211055')
        EnterApplicationFormDetails('123street', 'Melvile', 'Hamilton', '27', '57000', '30/09/2022', '1200', 'Four Weeks')
        cy.wait(4000);
        LoadRecruitmentPlugin()
        cy.wait(14000);
        XHRWait();
        //CheckTextNotVisible('loading, please wait...')
        ApplyVacancy('2')
        EnterFirstFormDetails('Matthew', 'Petrie', 'XXXmatthew.petrie@nzamg.co.nz', '0274125879')
        EnterApplicationFormDetails('123street', 'Melvile', 'Hamilton', '27', '57000', '30/09/2022', '1200', 'Four Weeks')
        cy.wait(4000);
    })
    
    it('24.Continued - 11974', () => {
        SignIn(1440, 900)
        cy.wait(4000)
        ClickButtonByText('Recruitment')
        LoadApplicantPoolTab()
        SearchApplicant('Wayne moore')
        //OpenCandidate('1')
        cy.wait(4000)
        cy.get('#recruitmentApplicantPool_buttonGoToApplicant_1_0').click();// open candidate

        cy.wait(5000)
        //CheckTextNotVisible('Existing Staff / Ref #')
        //cy.contains('Existing Staff / Ref #').should('not.be.visible')
        cy.get('.dark-green-text').should('not.contain', 'Existing Staff / Ref #')
        cy.get('.close-footer-btn').click();
        cy.wait(4000)
        SearchApplicant('Robyn Bain');
        cy.wait(3000)
        cy.get('#recruitmentApplicantPool_buttonGoToApplicant_1_0').click();
        // OpenCandidate('1');
        cy.wait(4000)
        CheckContains('Staff No:');
        cy.get('.close-footer-btn').click();
        cy.wait(4000)
        SearchApplicant('Matthew petrie');
        cy.wait(3000)
        //OpenCandidate('1');
        cy.get('#recruitmentApplicantPool_buttonGoToApplicant_1_0').click();
        cy.wait(4000)
        CheckContains('Staff No:');
    })



    it('25.Duplicate candidate matching test - 12022', () => {
        SignIn(1440, 900);
        ClickButtonByText('Recruitment')
        cy.wait(4000)
        LoadRecruitmentSetting();
        ChangeDuplicateThreshold()
        cy.wait(4000)
        XHRWait()

    })

    it('26. Continued - 12022', () => {
        cy.wait(4000);
        LoadRecruitmentPlugin()
        cy.wait(44000);
        XHRWait();
        //CheckTextNotVisible('loading, please wait...');
        ApplyVacancy('2')
        EnterFirstFormDetails('Wade', 'Wilson', 'xxdeadpool@whyinxmen.com', '1121421')
        cy.wait(14000);
        EnterApplicationFormDetails('IM123', 'asdade', 'california', '27', '57000', '30/09/2022', '1200', 'Four Weeks')
        cy.wait(14000);
        LoadRecruitmentPlugin()
        cy.wait(14000);
        XHRWait();
        //CheckTextNotVisible('loading, please wait...')
        ApplyVacancy('2')
        EnterFirstFormDetails('Wade', 'Wilson', 'xxdeadpool@whyinxmen.com', '1121421')
        EnterApplicationFormDetails('123street', 'Melvile', 'Hamilton', '27', '57000', '30/09/2022', '1200', 'Four Weeks')
        cy.wait(4000);
    })

    it('27. Continued - part 2 - 12022', () => {
        SignIn(1440, 900)
        ClickButtonByText('Recruitment')
        cy.wait(4000)
        LoadApplicantPoolTab()
        cy.wait(4000)
        SearchApplicant('Wade Wilson')
        cy.wait(4000)
        //cy.get('.editable-text > .fa').click();
        //cy.get('.height100 > .d-flex > .fa-pencil').click();
        cy.get('#recruitmentApplicantPool_buttonGoToApplicant_1_0').click();//edit pencil icon
        cy.wait(4000)
    })


    it('28.Adding new vacany- Currently no vacancy/job exists', () => {
        SignIn(1440, 900);
        ClickButtonByText('User Security');
        SearchUser("Adam")
        LoadUserAccessTab()
        SelectUserAccess('Recruitment')
        SignOut()
        SignInUser('Adam.Clement@unittestdb', 'Zambion@12')
        //cy.get('.mb-15').type('test');
       // cy.get('.col-3:nth-child(2)').click();
        SwitchUserAndDept('CHC Service', 'Richard ERPE (6007)-F')
        ClickButtonByText('Recruitment');
        cy.wait(4000)
        LoadRecruitmentTab()
        cy.wait(14000)
        CreateVacancy('Brand Specialist', 'Application Form', 'Brand Specialist', 'Employment Form')
        cy.wait(4000)
     

    })
})