describe('Meal Plan Page', () => {
    it('should actually drag', () => {
        cy.visit('localhost:4200/meal-plan');

        cy.get('.list-group > :nth-child(1)').trigger('dragstart');

        cy.get('.list-group > :nth-child(1)')
            .invoke('attr', 'ng-reflect-dnd-draggable')
            .then((val) => {
                if (val) {
                    cy.get('.month > :nth-child(2) > :nth-child(1)').trigger('dndDrop', {
                        dataTransfer: new DataTransfer(),
                        data: val,
                    });
                }
            });

        cy.get('.modal-body');
    });
});
