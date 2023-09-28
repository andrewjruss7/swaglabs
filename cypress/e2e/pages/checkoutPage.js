class CheckoutPage {
    constructor() {
        this.tittle = '.subheader';
        this.contentCheckoutTittle = 'Checkout: Your Information';
        this.buttonContinue = 'input';
        this.buttonContinueContent = 'CONTINUE';
        this.buttonFinish = 'a';
        this.buttonFinishContent = 'FINISH';
        this.tittleFinish = 'h2';
        this.tittleFinishContent = 'THANK YOU FOR YOUR ORDER';
        this.tittleErrorFirstName = 'Error: First Name is required';
        this.tittleErrorLastName = 'Error: Last Name is required';
        this.tittleErrorPostalCode = 'Error: Postal Code is required'
        
    };

    assertCheckoutTittle() {
        return cy.get(this.tittle)
            .should('be.visible', this.contentCheckoutTittle)
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

    errorMenssage(){
        return this.getElement("error")
    };

    clickButtonContinue() {
        return cy.get(this.buttonContinue)
            .contains(this.buttonContinueContent)
            .click();
    };

    clickButtonFinish() {
        return cy.get(this.buttonFinish)
            .contains(this.buttonFinishContent)
            .click();
    };

    assertFinishTittle() {
        return cy.get(this.tittleFinish)
            .contains(this.tittleFinishContent)
            .should('be.visible')
    };

    assertErrorFirstName(){
        return cy.contains(this.tittleErrorFirstName)
        .should('be.visible')
    };

    assertErrorLastName(){
        return cy.contains(this.tittleErrorLastName)
        .should('be.visible')
    };

    assertErrorPostalCode(){
        return cy.contains(this.tittleErrorPostalCode)
        .should('be.visible')
    }


}

export default CheckoutPage;