import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CalendarType } from '../meal-plan-calendar/meal-plan-calendar.component';

@Component({
    selector: 'app-meal-plan-calendar-print',
    templateUrl: './meal-plan-calendar-print.component.html',
    styleUrls: ['./meal-plan-calendar-print.component.scss'],
})
export class MealPlanCalendarPrintComponent {
    destroyed = new Subject<void>();

    canShowMonthly = false;

    calendaryTypes = CalendarType;
    calendarType: CalendarType;

    constructor(route: ActivatedRoute) {
        route.queryParams.subscribe((params) => {
            console.log(params);
        });
    }

    public showWeekly() {
        this.calendarType = CalendarType.weekly;
    }

    public showMonthly() {
        if (this.canShowMonthly) {
            this.calendarType = CalendarType.monthly;
        }
    }

    public print() {}
}
