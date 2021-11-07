import { createAction, props } from '@ngrx/store';
import { Meal } from 'src/app/interfaces/meal';
import { Recipe } from 'src/app/interfaces/recipe';

export interface MealRecipeActionProps {
    meal: Meal;
    recipe: Recipe;
    date: Date;
}

export const addRecipeToMeal = createAction(
    '[Meal Plan] Add Recipe To Meal Plan',
    props<MealRecipeActionProps>()
);

export const removeRecipeFromMeal = createAction(
    '[Meal Plan] Remove Recipe From Meal Plan',
    props<MealRecipeActionProps>()
);
