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

    it.only('Validate total products', () => {
        const products = require('../../fixtures/products.json');

        products.forEach((product) => {
            cartPage.productAdded(product.name, product.price);
        });
        cy.clickCartButton();
        cy.wrap(api.fetchApiData()).then((apiData) => {
            checkoutPage.firstName().type(apiData.firstName);
            checkoutPage.lastName().type(apiData.lastName);
            checkoutPage.postalCode().type(apiData.postalCode);
            checkoutPage.clickButtonContinue();
            cartPage.scrollDown();

            const individualPrices = [];
            let sumOfPrices = 0;
            cy.get('.cart_item_label').each(($price) => {
                const priceOfTheProduct = $price.find('.inventory_item_price').text();
                const numericalPrice = parseFloat(priceOfTheProduct.replace('$', ''));

                individualPrices.push(numericalPrice);
            }).then(() => {
                const sumIndivualPrices = individualPrices.reduce((acc, price) => acc + price, 0);
                cy.get('.summary_subtotal_label').invoke('text').then((totalOnPage) => {
                    if (totalOnPage.trim() !== '') {
                        const numericTotal = parseFloat(totalOnPage.replace(/[^\d.]/g, ''))

                        expect(sumIndivualPrices).to.equal(numericTotal)
                        cy.log(`Sum of prices $${sumOfPrices.toFixed(2)}`);
                    } else {
                        cy.log('Total in Page is empty! :(')
                    }
                })
            });
        });
    });
});
