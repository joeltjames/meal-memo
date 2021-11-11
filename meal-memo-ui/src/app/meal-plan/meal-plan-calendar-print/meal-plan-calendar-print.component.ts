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

    startDate: string | null;

    constructor(activatedRoute: ActivatedRoute) {
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
