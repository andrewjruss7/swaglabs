import CheckoutPage from "../pages/checkoutPage";
import CartPage from "../pages/cartPage";
const api = require('../../support/apiUsers');
describe('Checkout', () => {
    const checkoutPage = new CheckoutPage();
    const cartPage = new CartPage();
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.loginSuccess();
        cy.addProducts();
        cy.clickCartButton();
    });

    it('Checkout Finish', () => {
        cy.wrap(api.fetchApiData()).then((apiData) => {
            checkoutPage.firstName().type(apiData.firstName);
            checkoutPage.lastName().type(apiData.lastName);
            checkoutPage.postalCode().type(apiData.postalCode);
            checkoutPage.clickButtonContinue();
            cartPage.scrollDown();
            checkoutPage.clickButtonFinish();
            checkoutPage.assertFinishTittle();
        });
    });
});