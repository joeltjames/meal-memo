import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { distinct, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faCalendarWeek, faPrint } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { MonthlyMealPlanComponent } from '../monthly-meal-plan/monthly-meal-plan.component';

export enum CalendarType {
    weekly = 'WEEKLY',
    monthly = 'MONTHLY',
}

@Component({
    selector: 'app-meal-plan-calendar',
    templateUrl: './meal-plan-calendar.component.html',
    styleUrls: ['./meal-plan-calendar.component.scss'],
})
export class MealPlanCalendarComponent implements OnInit, OnDestroy {
    @ViewChild(MonthlyMealPlanComponent)
    monthlyCalendar: MonthlyMealPlanComponent;

    destroyed = new Subject<void>();

    monthlyIcon = faCalendarAlt;
    weeklyIcon = faCalendarWeek;
    printIcon = faPrint;

    canShowMonthly = false;

    calendarTypes = CalendarType;

    startDate$ = new Subject<dayjs.Dayjs>();
    endDate$ = new Subject<dayjs.Dayjs>();

    startDate: string | null;

    private internalCalendarType: CalendarType;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        breakpointObserver: BreakpointObserver
    ) {
        activatedRoute.queryParams.subscribe((params) => {
            if ('type' in params && params.type !== this.calendarType) {
                this.calendarType = params.type;
            } else if (!('type' in params)){
                this.calendarType = this.canShowMonthly ? CalendarType.monthly : CalendarType.weekly;
            }

            if ('startDate' in params && params.startDate !== this.startDate) {
                this.startDate = params.startDate;
            }
        });

        breakpointObserver
            .observe(['(min-width: 768px)'])
            .pipe(takeUntil(this.destroyed))
            .subscribe((state: BreakpointState) => {
                this.canShowMonthly = state.matches;
            });
    }

    public get calendarType() {
        return this.internalCalendarType;
    }

    public set calendarType(type: CalendarType) {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { type },
            queryParamsHandling: 'merge',
        });
        this.internalCalendarType = type;
    }

    public ngOnInit() {
        this.startDate$.subscribe((date) => {
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: { startDate: date.format('YYYY-MM-DD') },
                queryParamsHandling: 'merge',
            });
        });
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    public showWeekly() {
        this.calendarType = CalendarType.weekly;
    }

    public showMonthly() {
        if (this.canShowMonthly) {
            this.calendarType = CalendarType.monthly;
        }
    }

    public print() {
        this.router
            .navigate([{ outlets: { print: ['meal-plan', 'print'] } }], {
                queryParams: { type: this.calendarType },
            })
            .then(() => {
                setTimeout(() => window.print());
            });
    }
}
