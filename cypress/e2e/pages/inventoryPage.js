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

    callSelector () {
        return cy.get('[class="product_sort_container"]');
    }
    
    checkOrderProductsByName(orderSelector) {
        const namesList = [];
                
        return cy.get('.inventory_item_name').each(($element) => {
            const list = $element.text().trim();
            namesList.push(list);
                            
        }).then(() => {
            const sortedList = [...namesList].sort((a, b) => {
                if (orderSelector === 'asc') {
                    return a.localeCompare(b, undefined, {sensitivity:'base'}); 
                } else if (orderSelector === 'des') {
                    return b.localeCompare(a, undefined, {sensitivity:'base'});
                }
            });            
            expect(namesList).to.deep.equal(sortedList);

            cy.log(...namesList);
            cy.log(...sortedList);   
        })
    }

    checkOrderProductsByPrice(orderSelector) {
        const pricesList = [];
                
        return cy.get('.inventory_item_price').each(($element) => {
            const list = parseFloat($element.text().replace('$', '').trim());
            pricesList.push(list);

        }).then(() => {
            let sortedList;

            if (orderSelector === 'asc') {
                sortedList = [...pricesList].sort((a, b) => a - b);}
            else if(orderSelector === 'des') {
                sortedList = [...pricesList].sort((a, b) => b - a);}      
            
            expect(pricesList).to.deep.equal(sortedList);

            cy.log(...pricesList);
            cy.log(...sortedList);
        })
    }
}

export default InventoryPage