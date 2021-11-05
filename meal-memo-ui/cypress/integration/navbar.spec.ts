describe('Navbar', () => {
    before(() => {
        cy.visit('http://localhost:4200');
    });

    it('should navigate To Dashboard when brand logo is clicked', () => {
        cy.get('[data-cy=brand]').click();
        cy.url().should('include', '/dashboard');
    });

    it('should navigate To Dashboard when dashboard is clicked', () => {
        cy.get('[data-cy=dashboard]').click();
        cy.url().should('include', '/dashboard');
    });

    it('should navigate to Recipes when recipe is clicked', () => {
        cy.get('[data-cy=recipes]').click();
        cy.url().should('include', '/recipes');
    });

    it('should navigate to Meal Plan when meal plan is clicked', () => {
        cy.get('[data-cy=meal-plan]').click();
        cy.url().should('include', '/meal-plan');
    });

    it('should navigate to Shopping List when shopping list is clicked', () => {
        cy.get('[data-cy=shopping-list]').click();
        cy.url().should('include', '/shopping-list');
    });

    it('should navigate to Settings when tool icon is clicked', () => {
        cy.get('[data-cy=settings]').click();
        cy.url().should('include', '/settings');
    });

    it('should navigate to Profile when user icon is clicked', () => {
        cy.get('[data-cy=profile]').click();
        cy.url().should('include', '/profile');
    });
});
