class CartPage {
    constructor() {
        this.buttonCheckout = '.btn_action';
        this.cartItem = '.cart_item_label';
        this.itemName = '.inventory_item_name';
        this.itemPrice = '.inventory_item_price';
        this.miElemento = '.btn_primary.cart_button';
        this.test = ".btn_primary";
        this.itemsubTotal = '.summary_subtotal_label';
        this.itemTotal = '.summary_total_label';
        this.checkoutinfo = {
            firstName: '#first-name',
            lastName: '#last-name',
            postalCode: '#postal-code'
            
        };
    }

    scrollDown() {
        cy.scrollTo('bottom');

    }
    clickCheckoutButton() {
        return cy.get(this.buttonCheckout).click();
    }
    itemsubTotal(){
        return cy.get(this.itemsubTotal).contains();
    }
    itemTotal (){
        return cy.get(this.itemTotal).contains()
    }

    assertTotalPrice(expectedTotalPrice) {
        cy.get('#totalPrice').invoke('text').then((totalPriceText) => {
            const totalPrice = parseFloat(totalPriceText.replace('$', ''));
    
            // Validar que el precio total sea igual al precio esperado
            expect(totalPrice).to.equal(expectedTotalPrice);
        });
    }
    
    clickBtnPrimaryCartButton() {
        return cy.get(this.btnPrimaryCartButton).click();
    }
  

    productAdded(itemName, itemPrice) {
        if (itemName && itemPrice) {
            cy.get(this.cartItem)
                .find(this.itemName)
                .contains(itemName)
                .should('be.visible');

            cy.get(this.cartItem)
                .find(this.itemPrice)
                .contains(itemPrice)
                .should('be.visible');
        }
    }


    fillCheckoutInfo(firstName, lastName, postalCode) {
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#postal-code').type(postalCode);
    }

    clickContinue (){
       //  return cy.get (this.miElemento).click();
       return cy.get(this.test).click();
    }
   itemTotal (){
    return cy.get (this.itemTotal),visible()
   }

    
}

export default CartPage;
