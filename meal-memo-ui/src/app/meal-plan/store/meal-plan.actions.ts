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

export const addMeal = createAction('[Meal] Add Meal');

export interface RemoveMealProps {
    toRemove: Meal;
}
export const removeMeal = createAction(
    '[Meal] Remove Meal',
    props<RemoveMealProps>()
);

export interface ReOrderMealProps {
    updatedOrder: Meal[];
}
export const reorderMeals = createAction(
    '[Meal] Re-Order Meal',
    props<ReOrderMealProps>()
);
