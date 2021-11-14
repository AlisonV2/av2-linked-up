describe('Check artist gallery', () => {
  it('Test artist gallery', () => {
    cy.visit('/');
    // cy.get('#logout-link').click({force: true})
    cy.get('#login-link').click({ force: true });
    cy.get('input[type="email"]').type('artist@test.com');
    cy.get('input[type="password"]').type('artist123');
    cy.get('button').click();
    cy.wait(1000);
    cy.get('.bi-images').click();
    cy.fixture('default-placeholder.png').then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'default-placeholder.png',
        mimeType: 'image/png',
      });
    });
    cy.get('button').click();
    cy.get('.bi-box-arrow-right').click();
    cy.get('#logout-link').should('not.exist');
  });
});
