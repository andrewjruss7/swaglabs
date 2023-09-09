import LoginPage from "../e2e/pages/loginPage";
import InventoryPage from "../e2e/pages/inventoryPage";
Cypress.Commands.add('loginSuccess', () => {
    const loginPage = new LoginPage()
    const inventoryPage = new InventoryPage()

    const user = require('../fixtures/users.json')

    loginPage.username().type(user[0].username)
    loginPage.password().type(user[0].password)
    loginPage.buttonLogin().click()
    inventoryPage.assertInventoryTittle().should('be.visible', user.expected)
})