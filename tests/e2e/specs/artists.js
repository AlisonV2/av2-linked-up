describe('Browse all artists', () => {
  it('Test all artists', () => {
    cy.visit('/');
    cy.get('#artists-link').click({ force: true });
    cy.get('[data-test="mR9w90C9fMQfVHJWjGo1TrBxPuk1"]').scrollIntoView();
    cy.get('[data-test="mR9w90C9fMQfVHJWjGo1TrBxPuk1"]').click({force: true});
    cy.get('button').should('have.text', 'Contact Dirty Jonz');
  });
});
