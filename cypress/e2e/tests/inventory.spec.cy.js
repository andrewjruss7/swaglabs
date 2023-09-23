import InventoryPage from "../pages/inventoryPage";
describe('Cart', () => {
    const inventoryPage = new InventoryPage()
    
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.loginSuccess();
    });

    //it('Seleccionar opcion del selector', () => {
    //    inventoryPage.selectFronAtoZ();
        
    
    it('Verificar orden de productos de A a Z', () => {
        
        // Seleccionar la opción "Name (A to Z)"
        inventoryPage.selectFromAtoZ();
       
        inventoryPage.getProductNames().then((productNames) => {
            inventoryPage.checkOrderProducts(productNames);
        })
        cy.log(`Orden alfabetico de A a Z verificado`);
    });

    it('Verificar orden de productos de Z a A', () => {
        inventoryPage.selectFronZtoA();

        inventoryPage.getProductNames().then((productNames) => {
            inventoryPage.checkOrderProducts(productNames);
        })
        cy.log(`Orden alfabetico de Z a A verificado`);
    });

    it('Verificar orden de productos de precio mas bajo al mas alto', () => {
        inventoryPage.selectFronLowtoHigh();
        inventoryPage.getProductNames().then((productNames) => {
            inventoryPage.checkOrderProducts(productNames);
        })
    });
    it('Verificar orden de productos de precio mas alto al mas bajo', () => {
        inventoryPage.selectFronHightoLow();
        inventoryPage.getProductNames().then((productNames) => {
            inventoryPage.checkOrderProducts(productNames);
        })
    });
       
        

    /*it('Add products to cart', () => {
        inventoryPage.getProductsCount().then((initialProductCount) => {
            inventoryPage.clickOnAllButtons();
            inventoryPage.getProductsCount().should('be.gte', initialProductCount + 1);
        });
        inventoryPage.clickCartButton();
    });*/

    
});