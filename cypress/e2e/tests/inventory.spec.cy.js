import InventoryPage from "../pages/inventoryPage";
describe('Cart', () => {
    const inventoryPage = new InventoryPage();

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.loginSuccess();
    });

    it('Add products to cart', () => {
        inventoryPage.getProductsCount().then((initialProductCount) => {
            inventoryPage.clickOnAllButtons();
            inventoryPage.getProductsCount().should('be.gte', initialProductCount + 1);
        });
        inventoryPage.clickCartButton();

    });

    it('add products three to cart', () => {
        inventoryPage.getProductsthree();
        inventoryPage.clickCartButton();
        inventoryPage.assertInventoryCart();
        
    })

    it('add products four to cart', () => {
       inventoryPage.getProductsfour();
       inventoryPage.clickCartButton();
       inventoryPage.assertInventoryCartfour();
       

    })

    
});