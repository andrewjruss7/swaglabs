import LoginPage from "../pages/loginPage";
import InventoryPage from "../pages/inventoryPage";
import HomePage from "../pages/homePage";
describe('Login', () => {
    const loginPage = new LoginPage()
    const inventoryPage = new InventoryPage()
    const homePage = new HomePage()

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
    });

    const users = require('../../fixtures/users.json')

    users.forEach((user) => {
        it(user.test, () => {
            loginPage.username().type(user.username)
            loginPage.password().type(user.password)
            loginPage.buttonLogin().click()

            if (user.test === 'login success') {
                inventoryPage.assertInventoryTittle().should('be.visible', user.expected)
            } 
            else if (user.test === 'login locked') {
                homePage.alertErrorLogin().should('be.visible', user.expected)
            }
            else if (user.test === 'login problem') {
                inventoryPage.testButtonOperation();
                cy.log('Mensaje:', user.expected);
            }
            else if (user.test === 'login performance_glitch') {
                inventoryPage.testPerformanceInventory();
                cy.log('Mensaje:', user.expected);
            }
        })
    })
})