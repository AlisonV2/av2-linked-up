describe('Sanity test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h2', 'Looking for an artist?');
  });
});
