describe('Search by location test', () => {
    it('Test search by location', () => {
      cy.visit('/');
      cy.get('#autocomplete').type('Bègles');
      cy.get('button').click();
      cy.get('[data-test="artist-name"]').click();
      cy.get('button').should('have.text', 'Contact Dirty Jonz')
    });
  });
  