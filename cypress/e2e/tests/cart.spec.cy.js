import InventoryPage from "../pages/inventoryPage";
import CartPage from "../pages/cartPage";
import CheckoutPage from "../pages/checkoutPage";
describe('Cart', () => {
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.loginSuccess();
        cy.addProducts();
    });

    it('click checkout button', () => {
        cartPage.scrollDown();
        cartPage.clickCheckoutButton();
        checkoutPage.assertCheckoutTittle().should('be.visible', 'Checkout: Your Information');
    });
});
