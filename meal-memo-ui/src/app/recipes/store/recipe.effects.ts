import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { RecipesService } from '../recipes.service';
import {
    loadRecipes,
    recipesLoadedSuccess,
    recipesSearchedSuccess,
    searchRecipes,
} from './recipe.actions';

@Injectable({
    providedIn: 'root',
})
export class RecipeEffects {
    loadRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadRecipes),
            switchMap((action) =>
                this.recipesService.getRecipes({page: action.page, limit: action.limit}).pipe(
                    map((recipes) => recipesLoadedSuccess({ recipes })),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    searchRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(searchRecipes),
            switchMap((action) =>
                this.recipesService.getRecipes({ filter: action.filter, page: action.page, limit: action.limit }).pipe(
                    map((recipes) => recipesSearchedSuccess({ recipes })),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private recipesService: RecipesService
    ) {}
}
