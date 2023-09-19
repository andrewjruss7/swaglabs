import InventoryPage from "../pages/inventoryPage";
import CartPage from "../pages/cartPage";
import CheckoutPage from "../pages/checkoutPage";
import products from "../../fixtures/products.json";
import api from "../../support/apiUsers";
describe('Cart', {scrollBehavior: false}, () => {
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.loginSuccess();
        cy.addProducts();
    });

    it('Check that products are added to the cart at checkout', () => {
        cartPage.scrollDown();
        cartPage.clickCheckoutButton();
        checkoutPage.assertCheckoutTittle();
    });

    it('Check that the products added are the same as those in the cart', () => {
        const products = require('../../fixtures/products.json');

        products.forEach((product) => {
            cartPage.productAdded(product.name, product.price);
        });
    });

    it.only('Check the value of the total products', () => {
        const products = require('../../fixtures/products.json');

        products.forEach((product) => {
            cartPage.productAdded(product.name, product.price);
        });
        cy.clickCartButton();
        cy.insertCheckoutFormData();
        cartPage.scrollDown();
        cartPage.checkTotalValue();
    });
});
