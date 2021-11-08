import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, interval, Observable, of, Subject } from 'rxjs';
import { RecipeState } from './store/recipe.reducer';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime, skip, switchMap, tap } from 'rxjs/operators';
import { filteredRecipeSelector } from './store/recipe.selector';
import { Router, Route } from '@angular/router';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
    recipeSearch = new FormControl('');

    recipes$: Observable<RecipeState>;

    searchIcon = faSearch;

    searchInputChange$ = new BehaviorSubject<string>('');

    constructor(private router: Router, private store: Store<{ recipe: RecipeState }>) {}

    ngOnInit(): void {
        this.recipes$ = this.searchInputChange$.pipe(
            debounceTime(500),
            switchMap((filter) => {
                console.log(filter);
                return this.store.select(filteredRecipeSelector(filter));
            })
        );

        this.recipeSearch.valueChanges.subscribe((val) => this.searchInputChange$.next(val));
    }


    openRecipe(recipe: any) {
        console.log(recipe);
    }
}
