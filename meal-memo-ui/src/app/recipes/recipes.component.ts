import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    BehaviorSubject,
    combineLatest,
    interval,
    Observable,
    of,
    Subject,
} from 'rxjs';
import { RecipeState } from './store/recipe.reducer';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime, skip, switchMap, tap } from 'rxjs/operators';
import { filteredRecipeSelector } from './store/recipe.selector';
import { Router, Route } from '@angular/router';
import { Recipe } from '../interfaces/recipe';
import { searchRecipes } from './store/recipe.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateRecipeModalComponent } from './create-recipe-modal/create-recipe-modal.component';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
    recipeSearch = new FormControl('');

    recipes$: Observable<Recipe[]>;

    searchIcon = faSearch;
    addIcon = faPlus;

    searchInputChange$ = new BehaviorSubject<string>('');

    constructor(
        private router: Router,
        private store: Store<{ recipe: RecipeState }>,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.recipes$ = this.store.select(filteredRecipeSelector);

        this.recipeSearch.valueChanges
            .pipe(debounceTime(500))
            .subscribe((filter) =>
                this.store.dispatch(searchRecipes({ filter }))
            );

        this.store.dispatch(searchRecipes({ filter: '' }));
    }

    openRecipe(recipe: any) {}

    createRecipe() {
        this.modalService.open(CreateRecipeModalComponent, { size: 'lg' });
    }
}
