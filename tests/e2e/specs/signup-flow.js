describe('Sign-up test & Logout', () => {
    it('Test signup flow', () => {
      cy.visit('/');
      cy.get('#login-link').click({ force: true });
      cy.get('.show-signup').click({ force: true });
      cy.get('input[type="text"]').type('Test');
      cy.get('input[type="email"]').type('test5@test.com');
      cy.get('input[type="password"]').type('test123');
      cy.get('select').select('artist');
      cy.get('button').click();
      cy.wait(1000);
      cy.get('.save-btn').should('have.text', 'Save');
      cy.get('.bi-box-arrow-right').click();
      cy.get('#logout-link').should('not.exist');
    });  
  });