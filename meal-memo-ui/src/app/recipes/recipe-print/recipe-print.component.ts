import { Location, LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Recipe } from 'src/app/interfaces/recipe';
import { sorted } from 'src/app/utils';
import { formatIngredient } from '../recipe.utils';
import { RecipeState } from '../store/recipe.reducer';
import { recipeBySlugSelector } from '../store/recipe.selector';

@Component({
    selector: 'app-recipe-print',
    templateUrl: './recipe-print.component.html',
    styleUrls: ['./recipe-print.component.scss'],
})
export class RecipePrintComponent implements OnInit {
    recipe$: Observable<Recipe | undefined>;

    formatIngredient = formatIngredient;
    sorted = sorted;

    constructor(
        private locationStrategy: LocationStrategy,
        private domSanitizer: DomSanitizer,
        route: ActivatedRoute,
        store: Store<{ recipe: RecipeState }>
    ) {
        this.recipe$ = route.params.pipe(
            map((params) => params.slug),
            switchMap((slug) => store.select(recipeBySlugSelector(slug)))
        );
    }

    ngOnInit(): void {}

    getServingInfo(recipe: Recipe) {
        let html = '';
        let count = 0;
        if (recipe.nutrients.servingSize) {
            count++;
            html += `Serving: ${recipe.nutrients.servingSize}`;
        }
        if (recipe.nutrients.calories) {
            if (count > 0) {
                html += ', ';
            }
            html += `Calories: ${recipe.nutrients.calories}`;
        }

        return this.domSanitizer.bypassSecurityTrustHtml(html);
    }

    getUrl(recipe: Recipe) {
        return (
            window.location.origin +
            this.locationStrategy.getBaseHref() +
            `recipes/${recipe.slug}`
        );
    }
}
