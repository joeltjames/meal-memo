import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeState } from '../store/recipe.reducer';
import { recipeBySlugSelector } from '../store/recipe.selector';

@Component({
    selector: 'app-recipe-print',
    templateUrl: './recipe-print.component.html',
    styleUrls: ['./recipe-print.component.scss'],
})
export class RecipePrintComponent implements OnInit {
    recipe$: Observable<Recipe | undefined>;

    constructor(route: ActivatedRoute, store: Store<{ recipe: RecipeState }>) {
        this.recipe$ = route.params.pipe(
            map((params) => params.slug),
            switchMap((slug) => store.select(recipeBySlugSelector(slug)))
        );
    }

    ngOnInit(): void {}
}
