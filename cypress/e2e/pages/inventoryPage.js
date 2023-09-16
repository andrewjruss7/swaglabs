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


    };
    getProductsthree() {
        return cy.get('[class="btn_primary btn_inventory"]')
        .each(($btn, index) => {if (index === 0 || index === 3 || index === 5) 
        {cy.wrap($btn).click()}});

    };    

    assertInventoryCart() {
    return cy.get('[class="fa-layers-counter shopping_cart_badge"]').contains(3);
        
    };

    getProductsfour() {
        return cy.get('[class="btn_primary btn_inventory"]')
        .each(($btn, index) => {if (index === 1 || index === 4) 
        {cy.wrap($btn).click()}});

    };  
    assertInventoryCartfour() {
        return cy.get('[class="fa-layers-counter shopping_cart_badge"]').contains(2);
            
        };


    clickCartButton() {
        return cy.get(this.cartItemCount).click();
    };

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



}


export default InventoryPage