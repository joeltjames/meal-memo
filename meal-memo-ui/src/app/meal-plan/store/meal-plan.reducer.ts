import { createReducer, on } from '@ngrx/store';
import { Meal } from 'src/app/interfaces/meal';
import { Recipe } from 'src/app/interfaces/recipe';
import { convertDate } from 'src/app/utils';
import { addRecipeToMeal, MealRecipeActionProps, removeRecipeFromMeal } from './meal-plan.actions';

export type MealPlanState = { [date: string]: { [mealKey: string]: Recipe[] } };

const initialMealPlanState: MealPlanState = {};

const internalMealPlanReducer = createReducer(
    initialMealPlanState,
    on(addRecipeToMeal, (state: MealPlanState, props: MealRecipeActionProps) => {
        const dateKey = convertDate(props.date);
        const mutableState = JSON.parse(JSON.stringify(state)) as MealPlanState;
        if (!mutableState[dateKey]) {
            mutableState[dateKey] = {};
        }
        if (!mutableState[dateKey][props.meal.key]) {
            mutableState[dateKey][props.meal.key] = [];
        }
        if (!mutableState[dateKey][props.meal.key].map((r) => r.id).includes(props.recipe.id)) {
            mutableState[dateKey][props.meal.key].push(props.recipe);
        }
        return mutableState;
    }),
    on(removeRecipeFromMeal, (state: MealPlanState, props: MealRecipeActionProps) => {
        const dateKey = convertDate(props.date);
        const mutableState = JSON.parse(JSON.stringify(state)) as MealPlanState;
        if (dateKey in mutableState && props.meal.key in mutableState[dateKey]) {
            // TODO: make this better, this is horribly inefficient
            mutableState[dateKey][props.meal.key] = mutableState[dateKey][props.meal.key].filter(
                (recipe: Recipe) => recipe.id !== props.recipe.id
            );
        }
        return mutableState;
    })
);

export const mealPlanReducer = (state: any, action: any) => internalMealPlanReducer(state, action);

export type MealState = Meal[];

const initialMealState: MealState = [
    { id: 0, order: 0, key: 'breakfast', color: '#264653', name: 'Breakfast' },
    { id: 1, order: 1, key: 'morning_snack', color: '#2a9d8f', name: 'Morning Snack' },
    { id: 2, order: 2, key: 'lunch', color: '#e9c46a', name: 'Lunch' },
    { id: 3, order: 3, key: 'afternoon_snack', color: '#f4a261', name: 'Afternoon Snack' },
    { id: 4, order: 4, key: 'dinner', color: '#e76f51', name: 'Dinner' },
];

const internalMealReducer = createReducer(initialMealState);

export const mealReducer = (state: any, action: any) => internalMealReducer(state, action);
