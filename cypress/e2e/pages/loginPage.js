class LoginPage {
   getElement(dataTestValue) {
       return cy.get(`[data-test=${dataTestValue}]`);
   }

   username() {
       return this.getElement("username")
   }

    password() {
        return this.getElement("password")
    }

    error() {
       return this.getElement("error")
    }

    buttonLogin() {
        return cy.get('[id="login-button"]')
    }

    loginSuccess(valueAlert) {
       return cy.contains(valueAlert)
    }
}
export default LoginPage