import InventoryPage from "../pages/inventoryPage";
import CartPage from "../pages/cartPage";
import CheckoutPage from "../pages/checkoutPage";

describe('Cart', () => {
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

    it('Realizar flujo de checkout y validar precio total', () => {
        const products = require('../../fixtures/products.json');
        let totalExpectedPrice = 140.34;

        // Agregar productos al carrito y acumular el precio total esperado
        products.forEach((product) => {
            totalExpectedPrice += parseFloat(product.price);
            cartPage.productAdded(product.name, product.price); // Agregar producto al carrito
        });

        // Hacer clic en el botón de checkout
        cartPage.clickCheckoutButton();

        // Llenar la información de usuario en la página de checkout
        cartPage.fillCheckoutInfo('Andrea', 'Martinez', '000');
        cartPage.clickContinue();
     //  cy.get('.btn_primary').click()
        cy.url().should('include', '/checkout'); // Ejemplo de URL en la que la página se ha cargado

        let itemTotal;
        cy.contains('Item total').invoke('text').then(itemTotalText => {
            itemTotal = parseFloat(itemTotalText.match(/\d+\.\d{2}/)[0]);
            cy.log(`Precio del Item total: $${itemTotal}`);
        });

        // Obtener el texto del elemento que contiene "Total"
        let total;
        cy.contains('Total').invoke('text').then(totalText => {
            total = parseFloat(totalText.match(/\d+\.\d{2}/)[0]);
            cy.log(`Precio Total: $${total}`);
        });

        // Comparar los precios
        expect(itemTotal).to.equal(total);
    });
});
