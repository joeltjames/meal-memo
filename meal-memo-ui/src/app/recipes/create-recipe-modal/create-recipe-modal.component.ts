import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { importRecipe } from '../store/recipe.actions';
import { RecipeState } from '../store/recipe.reducer';

@Component({
    selector: 'app-create-recipe-modal',
    templateUrl: './create-recipe-modal.component.html',
    styleUrls: ['./create-recipe-modal.component.scss'],
})
export class CreateRecipeModalComponent implements OnInit {
    importUrl = new FormControl(
        'https://www.skinnytaste.com/chicken-and-white-bean-enchiladas-with/'
    );
    import = true;
    constructor(
        public activeModal: NgbActiveModal,
        private store: Store<{ recipe: RecipeState }>
    ) {}

    ngOnInit(): void {}

    add(): void {
        this.store.dispatch(importRecipe({ url: this.importUrl.value }));
        this.activeModal.close();
    }
}
