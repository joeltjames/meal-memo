import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeState } from '../store/recipe.reducer';
import { recipeBySlugSelector } from '../store/recipe.selector';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
    recipe$: Observable<Recipe | undefined>;

    constructor(private domSanitizer: DomSanitizer, route: ActivatedRoute, store: Store<{ recipe: RecipeState }>) {
        this.recipe$ = route.params.pipe(
            map((params) => params.slug),
            switchMap((slug) => store.select(recipeBySlugSelector(slug)))
        );
    }

    ngOnInit(): void {}

    public getDetailHtml(recipe: Recipe) {
        let html = '<p>';

        if (recipe.nutrients) {
            let count = 0;
            if (recipe.nutrients.calories) {
                html += recipe.nutrients.calories;
                count++;
            }
            if (recipe.nutrients.servingSize) {
                if (count > 0) {
                    html += ' | ';
                }
                count++;
                html += recipe.nutrients.servingSize;
            }
            if (recipe.yields) {
                if (count > 0) {
                    html += ' | ';
                }
                count++;
                html += recipe.yields;
            }
        }

        html += '</p>';

        return this.domSanitizer.bypassSecurityTrustHtml(html);
    }
}
