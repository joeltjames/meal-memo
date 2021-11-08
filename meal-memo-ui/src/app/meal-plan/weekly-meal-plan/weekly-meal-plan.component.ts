import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import * as dayjs from 'dayjs';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Meal } from 'src/app/interfaces/meal';
import { MealState, MealPlanState, mealPlanSelectorGenerator } from '../store';

@Component({
    selector: 'app-weekly-meal-plan',
    templateUrl: './weekly-meal-plan.component.html',
    styleUrls: ['./weekly-meal-plan.component.scss'],
})
export class WeeklyMealPlanComponent implements OnInit {
    public meal$: Observable<MealState>;
    public mealPlan$: Observable<{ [key: string]: any }>;

    mealsToDisplay = 1;

    date$ = new BehaviorSubject<dayjs.Dayjs>(dayjs());

    constructor(
        private domSanitizer: DomSanitizer,
        store: Store<{ mealPlan: MealPlanState; meal: MealState }>,
        breakpointObserver: BreakpointObserver
    ) {
        this.meal$ = store.select('meal');

        this.date$.subscribe((date) => {
            this.mealPlan$ = store.select(
                mealPlanSelectorGenerator(
                    date.subtract(1, 'd').format('YYYY-MM-DD'),
                    date.add(2, 'd').format('YYYY-MM-DD')
                )
            );
        });

        breakpointObserver
            .observe(['(min-width: 475px)', '(min-width: 600px)'])
            // TODO: handle destroying
            // .pipe(takeUntil(this.destroyed))
            .subscribe((state: BreakpointState) => {
                if (state.breakpoints['(min-width: 600px)']) {
                    this.mealsToDisplay = 3;
                } else if (state.breakpoints['(min-width: 475px)']) {
                    this.mealsToDisplay = 2;
                } else {
                    this.mealsToDisplay = 1;
                }
            });
    }

    ngOnInit(): void {}

    getNewDate() {
        return dayjs();
    }

    setDateTo(date: dayjs.Dayjs) {
        this.date$.next(date);
    }

    getColClass() {
        if (this.mealsToDisplay === 1) {
            return 'col-6';
        } else if (this.mealsToDisplay === 2) {
            return 'col-4';
        } else if (this.mealsToDisplay === 3) {
            return 'col-3';
        }
        return 'col';
    }

    getCellHtml(meal: Meal, mealPlan: { [key: string]: any }, date: dayjs.Dayjs) {
        const theseMeals = mealPlan[date.format('YYYY-MM-DD')];
        if (theseMeals) {
            let html = '<ul>';
            theseMeals[meal.key].forEach((recipe: any) => {
                html += `<li>${recipe.name}</li>`;
            });
            html += '</ul>';
            return this.domSanitizer.bypassSecurityTrustHtml(html);
        }
        return '';
    }

    getRowHeight(mealCount: number) {
        return `${85.0 / mealCount}%`;
    }
}
