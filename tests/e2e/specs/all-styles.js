describe('Browse all categories', () => {
    it('Browse style categories', () => {
      cy.visit('/');
      cy.get('.link-text').scrollIntoView();
      cy.get('.link-text').click({ force: true });
      cy.get('[alt="oldschool"]').click({ force: true });
      cy.get('[data-test="KgWmEDFgT3Q7byQ0lYTmxhCCcPB2"]').click({ force: true });
      cy.get('button').should('have.text', 'Contact Flynn');
    });
  });
  