import LoginPage from "../e2e/pages/loginPage";
import InventoryPage from "../e2e/pages/inventoryPage";
import CartPage from "../e2e/pages/cartPage";
import CheckoutPage from "../e2e/pages/checkoutPage";
Cypress.Commands.add('loginSuccess', () => {
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();

    const user = require('../fixtures/users.json')

    loginPage.username().type(user[0].username)
    loginPage.password().type(user[0].password)
    loginPage.buttonLogin().click()
    inventoryPage.assertInventoryTittle().should('be.visible', user.expected)
});

Cypress.Commands.add('addProducts', () => {
    const inventoryPage = new InventoryPage();

    inventoryPage.getProductsCount().then((initialProductCount) => {
        inventoryPage.clickOnAllButtons();
        inventoryPage.getProductsCount().should('be.gte', initialProductCount + 1);
    });
    inventoryPage.clickCartButton();
});

Cypress.Commands.add('clickCartButton', () => {
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    cartPage.scrollDown();
    cartPage.clickCheckoutButton();
    checkoutPage.assertCheckoutTittle().should('be.visible', 'Checkout: Your Information');
});

