describe('Search by style test', () => {
  it('Test search by style', () => {
    cy.visit('/');
    cy.get('[alt="blackwork"]').click({ force: true });
    cy.get('[data-test="artist-name"]').click();
    cy.get('button').should('have.text', 'Contact Dirty Jonz');
  });
});
