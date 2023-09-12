class CartPage {
    constructor() {
        this.buttonCheckout = '.btn_action';
    };

    scrollDown() {
        cy.scrollTo('bottom');
    };

    clickCheckoutButton() {
        return cy.get(this.buttonCheckout).click();
    };
}

export default CartPage;