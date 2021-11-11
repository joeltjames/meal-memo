import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Recipe } from 'src/app/interfaces/recipe';
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

    recipes$: Observable<RecipeState>;

    stringify = JSON.stringify;

    searchInputChange$ = new BehaviorSubject<string>('');

    constructor(store: Store<{ recipe: RecipeState }>) {
        this.recipes$ = this.searchInputChange$.pipe(
            debounceTime(500),
            switchMap((filter) => store.select(filteredRecipeSelector(filter)))
        );

        this.recipeSearch.valueChanges.subscribe((val) =>
            this.searchInputChange$.next(val)
        );
    }

    ngOnInit(): void {}
}
