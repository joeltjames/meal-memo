import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { ToastMessage } from 'src/app/toast/toast';
import { ToastService } from 'src/app/toast/toast.service';
import { RecipesService } from '../recipes.service';
import {
    importRecipe,
    loadRecipes,
    recipeImportSuccess,
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
                this.recipesService
                    .getRecipes({ page: action.page, limit: action.limit })
                    .pipe(
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
                this.recipesService
                    .getRecipes({
                        filter: action.filter,
                        page: action.page,
                        limit: action.limit,
                    })
                    .pipe(
                        map((recipes) => recipesSearchedSuccess({ recipes })),
                        catchError(() => EMPTY)
                    )
            )
        )
    );

    importRecipe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(importRecipe),
            map((action) => {
                const url = action.url;
                const toast = new ToastMessage(
                    `Importing recipe from <a href="${url}" target="_blank">${url}</a>`
                );
                this.toastService.createToast(toast);
                return { url, toast };
            }),
            switchMap((data) =>
                this.recipesService
                    .importRecipe({
                        url: data.url,
                    })
                    .pipe(
                        tap((recipe) => {
                            this.toastService.createToast(
                                new ToastMessage(
                                    `Successfully Imported <a href="recipes/${recipe.slug}">${recipe.title}</a>`,
                                    '',
                                    false
                                )
                            );
                            data.toast.close();
                        }),
                        map((recipe) => recipeImportSuccess({ recipe })),
                        catchError(() => EMPTY)
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private recipesService: RecipesService,
        private toastService: ToastService
    ) {}
}
