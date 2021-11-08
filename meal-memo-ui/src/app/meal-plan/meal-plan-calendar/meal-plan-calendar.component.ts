import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';

enum CalendarType {
    daily = 1,
    monthly,
}

@Component({
    selector: 'app-meal-plan-calendar',
    templateUrl: './meal-plan-calendar.component.html',
    styleUrls: ['./meal-plan-calendar.component.scss'],
})
export class MealPlanCalendarComponent implements OnDestroy {
    destroyed = new Subject<void>();

    calendarType = CalendarType.monthly;

    calendarTypes = CalendarType;

    constructor(breakpointObserver: BreakpointObserver) {
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

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
}
