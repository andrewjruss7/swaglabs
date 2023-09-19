class CartPage {
    constructor() {
        this.buttonCheckout = '.btn_action';
        this.cartItem = '.cart_item_label';
        this.itemName = '.inventory_item_name';
        this.itemPrice = '.inventory_item_price';
        this.cartItemLabel = '.cart_item_label';
        this.inventoryItemPrice = '.inventory_item_price';
        this.summarySubtotalLabel = '.summary_subtotal_label'
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

    checkTotalValue() {
        const individualPrices = [];
        let sumOfPrices = 0;
        cy.get(this.cartItemLabel).each(($price) => {
            const priceOfTheProduct = $price.find(this.inventoryItemPrice).text();
            const numericalPrice = parseFloat(priceOfTheProduct.replace('$', ''));

            individualPrices.push(numericalPrice);
        }).then(() => {
            const sumIndivualPrices = individualPrices.reduce((acc, price) => acc + price, 0);
            cy.get(this.summarySubtotalLabel).invoke('text').then((totalOnPage) => {
                if (totalOnPage.trim() !== '') {
                    const numericTotal = parseFloat(totalOnPage.replace(/[^\d.]/g, ''))

                    expect(sumIndivualPrices).to.equal(numericTotal)
                    cy.log(`Sum of prices $${sumOfPrices.toFixed(2)}`);
                } else {
                    cy.log('Total in Page is empty! :(')
                }
            })
        });
    }
}

export default CartPage;