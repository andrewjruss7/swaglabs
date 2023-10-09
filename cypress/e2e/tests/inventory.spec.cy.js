import InventoryPage from "../pages/inventoryPage";
describe('Cart', () => {
    const inventoryPage = new InventoryPage()
    
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

    it('Verificar orden de productos de A a Z', () => {
        inventoryPage.callSelector().select('Name (A to Z)');
        
        inventoryPage.checkOrderProductsByName();        
    })

    it('Verificar orden de productos de Z a A', () => {
        
        inventoryPage.callSelector().select('Name (Z to A)');
       
        inventoryPage.checkOrderProductsByName();  
    });

    it('Verificar orden de productos del precio mas bajo al mas alto', () => {
        
        inventoryPage.callSelector().select('Price (low to high)');
        
        inventoryPage.checkOrderProductsByPrice('asc');  
    });

    it('Verificar orden de productos de precio mas alto al mas bajo', () => {
        
        inventoryPage.callSelector().select('Price (high to low)');
        
        inventoryPage.checkOrderProductsByPrice('des');
    });    
});