describe('Checkout', () => {
    const checkoutPage = new CheckoutPage();
    const cartPage = new CartPage();

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.loginSuccess();
        cy.addProducts();
        cy.clickCartButton();
    });

    const testCases = require('../../fixtures/checkout/escenarios.json')

    for (const testName in testCases) {
        it(`Checkout - ${testName}`, () => {
            const testCase = testCases[testName];
            cy.wrap(api.fetchApiData()).then((apiData) => {
                if (testCase.firstName)
                    checkoutPage.firstName().type(apiData.firstName);

                if (testCase.lastName)
                    checkoutPage.lastName().type(apiData.lastName);

                if (testCase.postalCode)
                    checkoutPage.postalCode().type(apiData.postalCode);

                checkoutPage.clickButtonContinue();

                if (testCase.errorMessage) {
                    checkoutPage.errorMenssage();
                } else {
                    cartPage.scrollDown();
                    checkoutPage.clickButtonFinish();
                    testCase.assertFunction();
                }
            });
        });
    }
});