describe('Artist Dashboard Test', () => {
    it('Test login flow', () => {
      cy.visit('/');
      cy.get('#logout-link').click({force: true})
      cy.get('#login-link').click({ force: true });
      cy.get('.show-signup').click({ force: true });
      cy.get('.show-login').click({ force: true });
      cy.get('input[type="email"]').type('artist@test.com');
      cy.get('input[type="password"]').type('artist123');
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
      cy.get('.bi-envelope').click({ force: true });
      cy.get('.bi-card-checklist').click({ force: true });
      cy.get('.bi-calendar-date').click({ force: true });
      cy.get('.bi-gear').click({ force: true });
      cy.get('.bi-box-arrow-right').click({ force: true });
      cy.get('#logout-link').should('not.exist');
    });  
  });