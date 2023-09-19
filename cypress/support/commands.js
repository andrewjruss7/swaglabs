import LoginPage from "../e2e/pages/loginPage";
import InventoryPage from "../e2e/pages/inventoryPage";
import CartPage from "../e2e/pages/cartPage";
import CheckoutPage from "../e2e/pages/checkoutPage";
import api from "./apiUsers";

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();
const checkoutPage = new CheckoutPage();
const cartPage = new CartPage();
Cypress.Commands.add('loginSuccess', () => {

    const user = require('../fixtures/users.json');

    loginPage.username().type(user[0].username)
    loginPage.password().type(user[0].password)
    loginPage.buttonLogin().click()
    inventoryPage.assertInventoryTittle().should('be.visible', user.expected)
});

Cypress.Commands.add('addProducts', () => {
    inventoryPage.getProductsCount().then((initialProductCount) => {
        inventoryPage.clickOnAllButtons();
        inventoryPage.getProductsCount().should('be.gte', initialProductCount + 1);
    });
    inventoryPage.clickCartButton();
});

Cypress.Commands.add('clickCartButton', () => {
    cartPage.scrollDown();
    cartPage.clickCheckoutButton();
    checkoutPage.assertCheckoutTittle().should('be.visible', 'Checkout: Your Information');
});

Cypress.Commands.add('insertCheckoutFormData', () => {
    cy.wrap(api.fetchApiData()).then((apiData) => {
        checkoutPage.firstName().type(apiData.firstName);
        checkoutPage.lastName().type(apiData.lastName);
        checkoutPage.postalCode().type(apiData.postalCode);
        checkoutPage.clickButtonContinue();
    });
})

