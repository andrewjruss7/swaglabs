class InventoryPage {
    constructor() {
        this.tittle = '.product_label';
        this.productSelector = '.pricebar';
        this.addButonn = 'button';
        this.cartItemCount = '#shopping_cart_container';
    }

    assertInventoryTittle() {
        return cy.get(this.tittle);
    }

    clickOnAllButtons() {
        cy.get(this.productSelector).each(($button) => {
            cy.wrap($button).find(this.addButonn).click();
        });
    }

    getProductsCount() {
        return cy.get(this.cartItemCount).invoke('text').then((text) => {
            const count = parseInt(text.trim());
            return isNaN(count) ? 0 : count;
        });
    }

    clickCartButton() {
        return cy.get(this.cartItemCount).click();
    }

    testButtonOperation () {
        return cy.get('[class="btn_primary btn_inventory"]')
        .each(($boton, index) => {   
            cy.wrap($boton).click()})
        .then(() => {
            let alMenosUnBotonNoCambio = false;
            cy.get('[class="pricebar"] button')
            .each(($boton) => {
                if ($boton.text() !== 'REMOVE') {
                    alMenosUnBotonNoCambio = true;
                }
            })
            .then(() => {
                expect(alMenosUnBotonNoCambio).to.be.true;
            });
        })
    }

    testPerformanceInventory () {
        const tiempoAntes = Date.now()
        
        cy.then(() => {
            cy.contains('Products')
            .then(() => {
                const tiempoDespues = Date.now();
                
                const tiempoTranscurrido = tiempoDespues - tiempoAntes;
                const tiempoEsperado = 4000;
                expect(tiempoTranscurrido).to.be.greaterThan(tiempoEsperado);
            })
        })
    }

    selectFromAtoZ () {
        return cy.get('[class="product_sort_container"]').select('Name (A to Z)');
    } 
    
    selectFronZtoA () {
        return cy.get('[class="product_sort_container"]').select('Name (Z to A)');
    }
    selectFronLowtoHigh () {
        return cy.get('[class="product_sort_container"]').select('Price (low to high)');
    }
    selectFronHightoLow () {
        return cy.get('[class="product_sort_container"]').select('Price (high to low)');
    }

    getProductNames() {
        return cy.get('.inventory_item_name').invoke('text')
    }

    checkOrderProducts(productNames) {
        const nombres = productNames.split('\n'); 
        nombres.forEach((nombre, index) => {
            if (index < nombres.length - 1) {
                cy.wrap(nombre).should('not.be.greaterThan', nombres[index + 1]);
            }
        });
    }



}

export default InventoryPage