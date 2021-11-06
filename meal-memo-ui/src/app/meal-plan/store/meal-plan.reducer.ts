import { createReducer, on } from '@ngrx/store';
import { addRecipeToMeal } from './meal-plan.actions';

export const initialState = {};

const convertDate = (date: Date) => {
    const pad = (s: number) => (s < 10 ? '0' + s : s);
    return [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join('/');
};

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
        console.log(mutableState);
        console.log(val);
        return mutableState;
    })
);

export const mealPlanReducer = (state: any, action: any) => internalMealPlanReducer(state, action);
