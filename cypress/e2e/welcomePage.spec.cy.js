describe('Welcome page', () => {
	it("should entry on welcome page", () => {
		cy.visit("http://localhost:3000/");

        cy.url().should('equal', 'http://localhost:3000/')
	});

	it("Click sign up button, shoult redirect to sign up page", () => {
		cy.visit("http://localhost:3000/");
		cy.get('[data-test-id="signup"]').click()
        cy.url().should('equal', 'http://localhost:3000/sign-up')
	});

	it("Click sign in button, shoult redirect to sign in page", () => {
		cy.visit("http://localhost:3000/");
		cy.get('[data-test-id="signin"]').click()
        cy.url().should('equal', 'http://localhost:3000/sign-in')
	});
});