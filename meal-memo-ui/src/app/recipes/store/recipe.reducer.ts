import { createReducer } from '@ngrx/store';
import { Recipe } from 'src/app/interfaces/recipe';

export type RecipeState = Recipe[];

const initialRecipeState: Recipe[] = [...Array(100).keys()].map((i) => ({ id: i, name: `Recipe ${i}` }));

const internalRecipeReducer = createReducer(initialRecipeState);

export const recipeReducer = (state: any, action: any) => internalRecipeReducer(state, action);
