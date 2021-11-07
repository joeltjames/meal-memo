describe('Meal Plan Page', () => {
    it('should actually drag', () => {
        cy.visit('localhost:4200/meal-plan');

        cy.get('.list-group > :nth-child(1)').trigger('dragstart');

        cy.get('.list-group > :nth-child(1)')
            .invoke('attr', 'ng-reflect-dnd-draggable')
            .then((val) => {
                if (val) {
                    cy.get('#calendar-days > :nth-child(1)').trigger('dndDrop', {
                        dataTransfer: new DataTransfer(),
                        data: val,
                    });
                }
            });

        cy.get('.modal-body');
    });

    it('should be able to add recipe to meals after draggig', () => {
        cy.visit('localhost:4200/meal-plan');

        cy.get('.list-group > :nth-child(1)').trigger('dragstart');

        cy.get('.list-group > :nth-child(1)')
            .invoke('attr', 'ng-reflect-dnd-draggable')
            .then((val) => {
                if (val) {
                    cy.get('#calendar-days > :nth-child(1)').trigger('dndDrop', {
                        dataTransfer: new DataTransfer(),
                        data: val,
                    });
                }
            });

        for (let i= 1; i < 6; i++) {
            cy.get(`:nth-child(${i}) > .card > .card-footer > div`).click();
        }

        cy.get('.modal-footer > .btn-outline-primary').click();
    });
});
