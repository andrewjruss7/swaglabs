class HomePage {
    alertErrorLogin() {
        return cy.get('[data-test="error"]')
    }

}

export default HomePage