describe('Artists page test', () => {
  it('Test artist page, no client account', () => {
    cy.visit('/');
    cy.get('#artists-link').click({ force: true });
    cy.get('[data-test="mR9w90C9fMQfVHJWjGo1TrBxPuk1"]').scrollIntoView();
    cy.get('[data-test="mR9w90C9fMQfVHJWjGo1TrBxPuk1"]').click({force: true});
    cy.get('button').should('have.text', 'Contact Dirty Jonz');
    cy.get('button').click();
    cy.contains('p', 'You must have a client account to contact Dirty Jonz');
    cy.get('.navbar-brand').click({force: true});
    cy.get('.bi-arrow-right').click({force: true});
    cy.contains('h2', 'Search by style');
    cy.visit('/conventions');
    cy.contains('h2', 'Upcoming Events');
  });
});
