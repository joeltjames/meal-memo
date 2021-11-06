import { createReducer, on } from '@ngrx/store';
import { Recipe } from 'src/app/interfaces/recipe';
import { convertDate } from 'src/app/utils';
import { addRecipeToMeal } from './meal-plan.actions';

export type MealPlanState = { [date: string]: { [mealId: number]: Recipe } };

export const initialState: MealPlanState = {};


const internalMealPlanReducer = createReducer(
    initialState,
    on(addRecipeToMeal, (state: any, val: any) => {
        const dateKey = convertDate(val.date);
        const mutableState = JSON.parse(JSON.stringify(state));
        if (!mutableState[dateKey]) {
            mutableState[dateKey] = {};
        }
        if (!mutableState[dateKey][val.meal.id]) {
            mutableState[dateKey][val.meal.id] = [];
        }
        mutableState[dateKey][val.meal.id].push(val.recipe);
        return mutableState;
    })
);

export const mealPlanReducer = (state: any, action: any) => internalMealPlanReducer(state, action);
