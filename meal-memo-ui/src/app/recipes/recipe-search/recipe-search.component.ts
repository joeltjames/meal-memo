import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Recipe } from 'src/app/interfaces/recipe';
import { searchRecipes } from '../store/recipe.actions';
import { RecipeState } from '../store/recipe.reducer';
import { filteredRecipeSelector } from '../store/recipe.selector';

@Component({
    selector: 'app-recipe-search',
    templateUrl: './recipe-search.component.html',
    styleUrls: ['./recipe-search.component.scss'],
})
export class RecipeSearchComponent implements OnInit {
    @Output()
    recipeSelected = new EventEmitter<Recipe>();

    recipeSearch = new FormControl('');

    search = faSearch;

    recipes$: Observable<Recipe[]>;

    stringify = JSON.stringify;

    searchInputChange$ = new BehaviorSubject<string>('');

    constructor(store: Store<{ recipe: RecipeState }>) {
        this.recipes$ = store.select(filteredRecipeSelector);

        this.recipeSearch.valueChanges
            .pipe(debounceTime(500))
            .subscribe((filter) =>
                store.dispatch(searchRecipes({ filter }))
            );
    }

    ngOnInit(): void {}
}
