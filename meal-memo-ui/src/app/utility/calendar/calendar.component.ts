import {
    AfterViewInit,
    Component,
    ContentChild,
    OnInit,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import { DayCellContentDirective } from './day-cell-content.directive';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent {
    @ContentChild('cell', { static: false }) cellTemplate: TemplateRef<any>;

    public startOfMonth = dayjs().startOf('month');
    public endOfMonth = dayjs().endOf('month');
    public currentDate = dayjs();

    public yearMonthForm = new FormControl({
        year: this.currentDate.get('year'),
        month: this.currentDate.get('month'),
    });

    public weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    constructor() {
        this.yearMonthForm.valueChanges.subscribe((val) => {
            this.currentDate = dayjs(`${val.year}-${val.month + 1}-01`, 'YYYY-MM-DD');
        });
    }

    public changeMonth(offset: number) {
        this.currentDate = this.currentDate.add(offset, 'M');
    }

    public moveToPreviousMonth() {
        this.currentDate = this.currentDate.subtract(1, 'm');
    }

    private getNumberOfDaysInMonth(year: string, month: string) {
        return dayjs(`${year}-${month}-01`).daysInMonth();
    }

    private get currentMonthDays() {
        return this.createDaysForCurrentMonth(this.currentYear, this.currentMonth);
    }

    public get currentYear() {
        return this.currentDate.format('YYYY');
    }

    public get displayMonth() {
        return this.currentDate.format('MMMM');
    }

    private get currentMonth() {
        return this.currentDate.format('MM');
    }

    public get days() {
        return [
            ...this.createDaysForPreviousMonth(this.currentYear, this.currentMonth),
            ...this.currentMonthDays,
            ...this.createDaysForNextMonth(this.currentYear, this.currentMonth),
        ];
    }

    private createDaysForCurrentMonth(year: string, month: string) {
        return [...Array(this.getNumberOfDaysInMonth(year, month))].map((day, index) => ({
            date: dayjs(`${year}-${month}-${index + 1}`).format('YYYY-MM-DD'),
            dayOfMonth: index + 1,
            isCurrentMonth: true,
        }));
    }

    private getWeekday(date: any) {
        return dayjs(date).weekday();
    }

    private createDaysForPreviousMonth(year: string, month: string) {
        const firstDayOfTheMonthWeekday = this.getWeekday(this.currentMonthDays[0].date);

        const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, 'month');

        // Account for first day of the month on a Sunday (firstDayOfTheMonthWeekday === 0)
        const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday - 1 : 6;
        const previousMonthLastMondayDayOfMonth = dayjs(this.currentMonthDays[0].date)
            .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
            .date();

        return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => ({
            date: dayjs(
                `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`
            ).format('YYYY-MM-DD'),
            dayOfMonth: previousMonthLastMondayDayOfMonth + index,
            isCurrentMonth: false,
        }));
    }

    private createDaysForNextMonth(year: string, month: string) {
        const lastDayOfTheMonthWeekday = this.getWeekday(`${year}-${month}-${this.currentMonthDays.length}`);
        const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
            ? 7 - lastDayOfTheMonthWeekday
            : lastDayOfTheMonthWeekday;

        return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => ({
            date: dayjs(`${year}-${Number(month) + 1}-${index + 1}`).format('YYYY-MM-DD'),
            dayOfMonth: index + 1,
            isCurrentMonth: false,
        }));
    }
}
