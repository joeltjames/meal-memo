import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as dayjs from 'dayjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Meal } from 'src/app/interfaces/meal';
import { Recipe } from 'src/app/interfaces/recipe';
import { EditDailyMealPlanModalComponent } from '../edit-daily-meal-plan-modal/edit-daily-meal-plan-modal.component';
import { MealState, MealPlanState, mealPlanSelectorGenerator, addRecipeToMeal } from '../store';

@Component({
    selector: 'app-weekly-meal-plan',
    templateUrl: './weekly-meal-plan.component.html',
    styleUrls: ['./weekly-meal-plan.component.scss'],
})
export class WeeklyMealPlanComponent {
    public meal$: Observable<MealState>;
    public mealPlan$: Observable<{ [key: string]: any }>;

    mealsToDisplay = 1;

    date$ = new BehaviorSubject<dayjs.Dayjs>(dayjs());

    constructor(
        private domSanitizer: DomSanitizer,
        private modalService: NgbModal,
        private store: Store<{ mealPlan: MealPlanState; meal: MealState }>,
        breakpointObserver: BreakpointObserver
    ) {
        this.meal$ = store.select('meal');

        this.mealPlan$ = this.date$.pipe(
            switchMap((date) =>
                store.select(
                    mealPlanSelectorGenerator(
                        date.subtract(10, 'd').format('YYYY-MM-DD'),
                        date.add(10, 'd').format('YYYY-MM-DD')
                    )
                )
            )
        );
        const breakpointMap: { [breakpoint: string]: number } = {
            '(min-width: 400px)': 1,
            '(min-width: 500px)': 2,
            '(min-width: 700px)': 3,
            '(min-width: 900px)': 4,
            '(min-width: 1100px)': 5,
            '(min-width: 1300px)': 7,
        };
        const breakpoints = Object.keys(breakpointMap);
        breakpointObserver
            .observe(breakpoints)
            // .pipe(takeUntil(this.destroyed))
            .subscribe((state: BreakpointState) => {
                let found = false;
                for (let i = breakpoints.length - 1; i >= 0; i--) {
                    const breakpoint = breakpoints[i];
                    if (state.breakpoints[breakpoint]) {
                        this.mealsToDisplay = breakpointMap[breakpoint];
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.mealsToDisplay = 1;
                }
            });
    }

    public get dates$() {
        return this.date$.pipe(
            map((date) => {
                const days = [];

                const priorDayTotal = Math.ceil((this.mealsToDisplay - 1.0) / 2.0);
                for (let i = priorDayTotal; i > 0; i--) {
                    days.push(date.subtract(i, 'd'));
                }

                days.push(date);

                const postDayTotal = Math.floor((this.mealsToDisplay - 1.0) / 2.0);
                for (let i = 1; i <= postDayTotal; i++) {
                    days.push(date.add(i, 'd'));
                }

                return days;
            })
        );
    }

    getNewDate() {
        return dayjs();
    }

    setDateTo(date = dayjs()) {
        this.date$.next(date);
    }

    onDrop(meal: Meal, date: dayjs.Dayjs, event: { data?: string }) {
        if (event.data) {
            const recipe = JSON.parse(event.data);
            this.store.dispatch(addRecipeToMeal({ meal, recipe, date: date.toDate() }));
        }
    }

    getColClass(def = false) {
        // if (this.mealsToDisplay === 1) {
        //     return 'col';
        // } else if (this.mealsToDisplay === 2) {
        //     return 'col-4';
        // } else if (this.mealsToDisplay === 3) {
        //     return 'col-3';
        // }
        const ceil = Math.ceil(12 / (this.mealsToDisplay + 1));
        const floor = Math.floor(12 / (this.mealsToDisplay + 1));
        if (ceil !== floor && def) {
            return `col`;
        }
        return `col-${ceil}`;
    }

    getCellHtml(meal: Meal, mealPlan: { [key: string]: any }, date: dayjs.Dayjs) {
        const theseMeals = mealPlan[date.format('YYYY-MM-DD')];
        let html = ``;
        if (theseMeals) {
            html += '<ul>';
            theseMeals[meal.key]?.forEach((recipe: any) => {
                html += `<li>${recipe.name}</li>`;
            });
            html += '</ul>';
        }
        return this.domSanitizer.bypassSecurityTrustHtml(html);
    }

    editMealPlan(dateObj: dayjs.Dayjs, mealPlan: { [key: string]: any }) {
        const modal = this.modalService.open(EditDailyMealPlanModalComponent, { size: 'lg' });
        modal.componentInstance.date = dateObj;
        modal.componentInstance.meals = mealPlan[dateObj.format('YYYY-MM-DD')];
    }

    getRowHeight(mealCount: number) {
        if (mealCount <= 6) {
            return `${85.0 / mealCount}%`;
        }
        return null;
    }
}
