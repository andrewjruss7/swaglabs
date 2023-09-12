class CheckoutPage {
    constructor() {
        this.tittle = '.subheader';
    };

    assertCheckoutTittle() {
        return cy.get(this.tittle);
    };

    getElement(dataTestValue) {
        return cy.get(`[data-test=${dataTestValue}]`);
    };

    firstName() {
        return this.getElement("firstName")
    };

    lastName() {
        return this.getElement("lastName")
    };

    postalCode() {
        return this.getElement("postalCode")
    };
}

export default CheckoutPage;