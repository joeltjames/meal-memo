import { createFeatureSelector, createSelector } from '@ngrx/store';
import { convertDate } from 'src/app/utils';
import { MealPlanState } from './meal-plan.reducer';

const filterObjectBetweenDates = (startDate: string, endDate: string, toFilter: { [key: string]: any }) => {
    console.log(startDate);
    console.log(endDate);
    const start = new Date(Date.parse(startDate));
    const end = new Date(Date.parse(endDate));
    const filtered: { [key: string]: any } = {};

    console.log(toFilter);

    let loop = new Date(start);
    while (loop <= end) {
        const newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
        const dateStr = convertDate(loop);
        if (dateStr in toFilter) {
            filtered[dateStr] = toFilter[dateStr];
        }
        console.log(dateStr);
    }

    return filtered;
};

export const mealPlanSelector = createFeatureSelector<{ mealPlan: MealPlanState }>('mealPlan');

export const mealPlanSelectorGenerator = (startDate: string, endDate: string) =>
    createSelector(mealPlanSelector, (mealPlan) => filterObjectBetweenDates(startDate, endDate, mealPlan));
