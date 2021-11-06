describe('Check artist gallery delete img', () => {
    it('Test delete image', () => {
      cy.visit('/');
      cy.get('#login-link').click({ force: true });
      cy.get('input[type="email"]').type('test@test.com');
      cy.get('input[type="password"]').type('test123');
      cy.get('button').click();
      cy.wait(1000);
      cy.get('.bi-images').click();
      cy.get('.gallery-img-item').click({force: true});
      cy.wait(1000);
      cy.get('button').should('have.text', 'Update');
      cy.get('.bi-gear').click();
      cy.get('.bi-box-arrow-right').click();
      cy.get('#logout-link').should('not.exist');
    });
  });
  