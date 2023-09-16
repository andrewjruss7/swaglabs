import InventoryPage from "../pages/inventoryPage";
import CartPage from "../pages/cartPage";
import CheckoutPage from "../pages/checkoutPage";
import products from "../../fixtures/products.json";
describe('Cart', {scrollBehavior: false}, () => {
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.loginSuccess();
        cy.addProducts();
    });

    it('Click checkout button', () => {
        cartPage.scrollDown();
        cartPage.clickCheckoutButton();
        checkoutPage.assertCheckoutTittle();
    });

    it('Assert products', () => {
        const products = require('../../fixtures/products.json');

        products.forEach((product) => {
            cartPage.productAdded(product.name, product.price);
        });
    });

    it('Validate total products', () => {
        const products = require('../../fixtures/products.json');

        products.forEach((product) => {
            cartPage.productAdded(product.name, product.price);
        });
    });
});
