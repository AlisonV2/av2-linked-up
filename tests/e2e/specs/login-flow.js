describe('Login test, check gallery link & Logout', () => {
    it('Test login flow', () => {
      cy.visit('/');
      // cy.get('#logout-link').click({force: true})
      cy.get('#login-link').click({ force: true });
      cy.get('.show-signup').click({ force: true });
      cy.get('.show-login').click({ force: true });
      cy.get('input[type="email"]').type('artist@test.com');
      cy.get('input[type="password"]').type('artist123');
      cy.get('button').click();
      cy.wait(1000);
      cy.get('.save-btn').should('have.text', 'Save');
      cy.get('.bi-box-arrow-right').click();
      cy.get('#logout-link').should('not.exist');
    });  
  });