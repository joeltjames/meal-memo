import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';

enum CalendarType {
    weekly = 1,
    monthly,
}

@Component({
    selector: 'app-meal-plan-calendar',
    templateUrl: './meal-plan-calendar.component.html',
    styleUrls: ['./meal-plan-calendar.component.scss'],
})
export class MealPlanCalendarComponent implements OnDestroy {
    destroyed = new Subject<void>();

    monthlyIcon = faCalendarAlt;
    weeklyIcon = faCalendarWeek;

    canShowMonthly = false;

    calendaryTypes = CalendarType;
    calendarType: CalendarType;

    constructor(breakpointObserver: BreakpointObserver) {
        breakpointObserver
            .observe(['(min-width: 768px)'])
            .pipe(takeUntil(this.destroyed))
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.calendarType = CalendarType.monthly;
                    this.canShowMonthly = true;
                } else {
                    this.calendarType = CalendarType.weekly;
                    this.canShowMonthly = false;
                }
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
}
