describe('Client dashboard test', () => {
    it('Test client dashboard', () => {
      cy.visit('/');
      // cy.get('#logout-link').click({force: true})
      cy.get('#login-link').click({ force: true });
      cy.get('input[type="email"]').type('alison@test.com');
      cy.get('input[type="password"]').type('alison123');
      cy.get('button').click();
      cy.wait(1000);
      cy.get('.save-btn').should('have.text', 'Save');
      cy.fixture('default-placeholder.png').then((fileContent) => {
        cy.get('input[type="file"]').attachFile({
          fileContent: fileContent.toString(),
          fileName: 'default-placeholder.png',
          mimeType: 'image/png',
        });
      });
      cy.get('.thumbnail-button').click();
      cy.wait(1000);
      cy.get('.bi-envelope').click();
      cy.get('.message-item').should('have.length', 2);
      cy.get('.message-item').eq(0).click({force: true});
      cy.get('input[type="textarea"]').type('Hello from cypress');
      cy.get('.btn-outline-secondary').click();
      cy.get('.bi-box-arrow-right').click();
      cy.get('#logout-link').should('not.exist');
    });  
  });