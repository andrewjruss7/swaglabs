import InventoryPage from "../pages/inventoryPage";
describe('Cart', () => {
    const inventoryPage = new InventoryPage();

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.loginSuccess();
    });

    it('Add products to cart', () => {
        inventoryPage.getProductsCount().then((initialProductCount) => {
            inventoryPage.clickOnAllButtons();
            inventoryPage.getProductsCount().should('be.gte', initialProductCount + 1);
        });
        inventoryPage.clickCartButton();
    });
});