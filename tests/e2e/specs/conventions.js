describe('Conventions page test', () => {
    it('Test conventions page, logged out', () => {
      cy.visit('/');
      cy.get('#conventions-link').click({ force: true });
      cy.contains('h2', 'Upcoming events');
      cy.get('[data-test="gTvQIqYFzXCLID4TIU5u"]').click({force: true});
      cy.contains('h2', 'Love Tattoo');
    });
  });
  