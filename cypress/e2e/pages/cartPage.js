class CartPage {
    constructor() {
        this.buttonCheckout = '.btn_action';
        this.cartItem = '.cart_item_label';
        this.itemName = '.inventory_item_name';
        this.itemPrice = '.inventory_item_price';
    };

    scrollDown() {
        cy.scrollTo('bottom');
    };

    clickCheckoutButton() {
        return cy.get(this.buttonCheckout).click();
    };

    productAdded(itemName, itemPrice) {
        if (itemName && itemPrice) {
            cy.get(this.cartItem)
                .find(this.itemName)
                .contains(itemName)
                .should('be.visible')

            cy.get(this.cartItem)
                .find(this.itemPrice)
                .contains(itemPrice)
                .should('be.visible')
        }
    };
}

export default CartPage;