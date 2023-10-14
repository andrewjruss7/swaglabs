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
    
    clickOnFourRandomProducts() {
        const numberOfProductsToSelect = 4;
        cy.get(this.productSelector).then(($products) => {
            const selectedIndices = [];
            for (let i = 0; i < numberOfProductsToSelect; i++) {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * $products.length);
                } while (selectedIndices.includes(randomIndex));

                selectedIndices.push(randomIndex);
                cy.wrap($products[randomIndex]).find(this.addButonn).click();
                
            }
        });
    }

    assertInventoryCart(expectedCount) {
        cy.get(".shopping_cart_container").should(("exist"));
    }

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