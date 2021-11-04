describe('Search by style test', () => {
  it('Test search by style', () => {
    cy.visit('/');
    cy.get('#artists-link').click({ force: true });
    cy.get('[data-test="mR9w90C9fMQfVHJWjGo1TrBxPuk1"]').click();
    cy.get('button').should('have.text', 'Contact Dirty Jonz');
  });
});
