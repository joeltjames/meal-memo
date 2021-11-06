import { createAction, props } from '@ngrx/store';
import { Meal } from 'src/app/interfaces/meal';
import { Recipe } from 'src/app/interfaces/recipe';

export const addRecipeToMeal = createAction(
    '[Meal Plan] Add Recipe To Meal Plan',
    props<{ meal: Meal; recipe: Recipe; date: Date }>()
);
