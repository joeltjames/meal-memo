import { createAction, props } from '@ngrx/store';
import { Recipe } from 'src/app/interfaces/recipe';

export interface LoadRecipesProps {
    page?: number;
    limit?: number;
}

export const loadRecipes = createAction(
    '[Recipes] Load Recipes',
    props<LoadRecipesProps>()
);

export interface RecipesLoadedSuccessProps {
    recipes: Recipe[];
}

export const recipesLoadedSuccess = createAction(
    '[Recipes] Recipes Loaded Successfully',
    props<RecipesLoadedSuccessProps>()
);

export const recipesSearchedSuccess = createAction(
    '[Recipes] Recipes Searched Successfully',
    props<RecipesLoadedSuccessProps>()
);


export interface SearchRecipeProps extends LoadRecipesProps {
    filter: string;
}

export const searchRecipes = createAction(
    '[Recipes] Search Recipes',
    props<SearchRecipeProps>()
);

