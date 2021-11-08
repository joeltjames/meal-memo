import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { MealPlanCalendarDailyModalComponent } from '../meal-plan-calendar-daily-modal/meal-plan-calendar-daily-modal.component';
import { Store } from '@ngrx/store';
import { mealPlanSelectorGenerator, MealPlanState, MealState } from '../store';
import * as dayjs from 'dayjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Meal } from 'src/app/interfaces/meal';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';

enum CalendarType {
    daily = 1,
    monthly,
}

@Component({
    selector: 'app-meal-plan-calendar',
    templateUrl: './meal-plan-calendar.component.html',
    styleUrls: ['./meal-plan-calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MealPlanCalendarComponent implements OnInit, OnDestroy {
    destroyed = new Subject<void>();
    openModalSubject = new Subject<any>();
    mealPlan$: Observable<MealPlanState>;

    public startOfMonth = dayjs().startOf('month');
    public endOfMonth = dayjs().endOf('month');

    public meals: MealPlanState;

    meal$: Observable<MealState>;

    mealOptions: Meal[];

    calendarType = CalendarType.monthly;

    calendarTypes = CalendarType;

    constructor(
        private modalService: NgbModal,
        store: Store<{ mealPlan: MealPlanState; meal: MealState }>,
        private domSanitizer: DomSanitizer,
        breakpointObserver: BreakpointObserver
    ) {
        this.mealPlan$ = store.select(
            mealPlanSelectorGenerator(
                this.startOfMonth.format('YYYY-MM-DD'),
                this.endOfMonth.add(1, 'd').format('YYYY-MM-DD')
            )
        );

        this.mealPlan$.subscribe((mp) => {
            this.meals = mp;
        });

        store.select('meal').subscribe((meals) => {
            this.mealOptions = meals;
        });

        breakpointObserver
            .observe(['(min-width: 768px)'])
            .pipe(takeUntil(this.destroyed))
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.calendarType = CalendarType.monthly;
                } else {
                    this.calendarType = CalendarType.daily;
                }
            });
    }

    ngOnInit(): void {}

    getCellHtml(date: string) {
        const theseMeals = this.meals[date];
        if (theseMeals) {
            let html = '';
            Object.keys(theseMeals).forEach((key) => {
                const meal = this.mealOptions.filter((mo) => mo.key === key);
                if (meal && meal.length > 0) {
                    theseMeals[key].forEach((recipe) => {
                        html += `<div class="badge meal-badge" style="background: ${meal[0].color}">${recipe.name}</div>`;
                    });
                }
            });
            return this.domSanitizer.bypassSecurityTrustHtml(html);
        }
        return '';
    }

    onDrop(date: string, event: any) {
        const modal = this.modalService.open(MealPlanCalendarDailyModalComponent, { size: 'lg' });
        modal.componentInstance.date = dayjs(date, 'YYYY-MM-DD');
        modal.componentInstance.recipe = event.data ? JSON.parse(event.data) : {};
    }

    editMealPlan(date: string) {
        const modal = this.modalService.open(MealPlanCalendarDailyModalComponent, { size: 'lg' });
        const dateObj = dayjs(date, 'YYYY-MM-DD');
        modal.componentInstance.date = dateObj;
        modal.componentInstance.meals = this.meals[date];
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
}
