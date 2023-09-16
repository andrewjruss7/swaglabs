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

    clickCartButton() {
        return cy.get(this.cartItemCount).click();
    };



}


export default InventoryPage