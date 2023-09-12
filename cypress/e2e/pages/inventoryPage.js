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

    clickCartButton() {
        return cy.get(this.cartItemCount).click();
    };
}

export default InventoryPage