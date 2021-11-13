import { createFeatureSelector, createSelector } from '@ngrx/store';
import { convertDate } from 'src/app/utils';
import { MealState } from '.';
import { MealPlanState } from './meal-plan.reducer';

const filterObjectBetweenDates = (
    startDate: string,
    endDate: string,
    toFilter: { [key: string]: any }
) => {
    const start = new Date(Date.parse(startDate));
    const end = new Date(Date.parse(endDate));
    const filtered: { [key: string]: any } = {};

    let loop = new Date(start);
    while (loop <= end) {
        const newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
        const dateStr = convertDate(loop);
        if (dateStr in toFilter) {
            filtered[dateStr] = toFilter[dateStr];
        }
    }

    return filtered;
};

export const mealPlanSelector =
    createFeatureSelector<{ mealPlan: MealPlanState }>('mealPlan');

export const mealPlanSelectorGenerator = (startDate: string, endDate: string) =>
    createSelector(mealPlanSelector, (mealPlan) =>
        filterObjectBetweenDates(startDate, endDate, mealPlan)
    );

export const mealSelector = createSelector(
    createFeatureSelector<MealState>('meal'),
    (state) =>
        (JSON.parse(JSON.stringify(state)) as MealState).sort(
            (a, b) => a.order - b.order
        )
);
