import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeState } from '../store/recipe.reducer';

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

    constructor(store: Store<{ recipe: RecipeState }>) {
        this.recipes$ = store.select('recipe');

        this.recipeSearch.valueChanges.pipe(debounceTime(1000)).subscribe((filterValue) => {
            this.recipes$ = store
                .select('recipe')
                .pipe(map((recipes) => recipes.filter((r) => r.title.includes(filterValue))));
        });
    }

    ngOnInit(): void {}
}
