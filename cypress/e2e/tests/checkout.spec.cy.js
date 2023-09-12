import InventoryPage from "../pages/inventoryPage";
import CartPage from "../pages/cartPage";
import CheckoutPage from "../pages/checkoutPage";

const api = require('../../support/apiUsers');
describe('Checkout', () => {
    const inventoryPage = new InventoryPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.loginSuccess();
        inventoryPage.getProductsCount().then((initialProductCount) => {
            inventoryPage.clickOnAllButtons();
            inventoryPage.getProductsCount().should('be.gte', initialProductCount + 1);
            inventoryPage.clickCartButton();
            cartPage.scrollDown();
            cartPage.clickCheckoutButton();
            checkoutPage.assertCheckoutTittle().should('be.visible', 'Checkout: Your Information');
        });
    });

    it('ok? :)', () => {
        cy.wrap(api.fetchApiData()).then((apiData) => {
            checkoutPage.firstName().type(apiData.firstName);
            checkoutPage.lastName().type(apiData.lastName);
            checkoutPage.postalCode().type(apiData.postalCode);
        });
    });
});