import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat);

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit, OnChanges {
    @Output()
    startDateUpdated = new EventEmitter<dayjs.Dayjs>();
    @Output()
    endDateUpdated = new EventEmitter<dayjs.Dayjs>();
    @Input()
    startDate: string | null;

    @ContentChild('cell', { static: false }) cellTemplate: TemplateRef<any>;

    public yearMonthForm: FormControl;

    public weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    private internalCurrentDate: dayjs.Dayjs;

    constructor() {}

    public ngOnInit() {
        if (this.startDate) {
            this.currentDate = dayjs(this.startDate, 'YYYY-MM-DD');
        } else {
            this.currentDate = dayjs();
        }

        this.yearMonthForm = new FormControl({
            year: this.currentDate.get('year'),
            month: this.currentDate.get('month'),
        });

        this.yearMonthForm.valueChanges.subscribe((val) => {
            const dateStr = `${val.year}-${(val.month + 1)
                .toString()
                .padStart(2, '0')}-01`;
            this.currentDate = dayjs(dateStr, 'YYYY-MM-DD');
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('startDate' in changes) {
            const startDateChanges = changes.startDate;
            const day = dayjs(startDateChanges.currentValue, 'YYYY-MM-DD');
            if (
                startDateChanges.currentValue !==
                    startDateChanges.previousValue &&
                this.currentDate !== day
            ) {
                this.currentDate = day;
            }
        }
    }

    public set currentDate(date: dayjs.Dayjs) {
        this.startDateUpdated.emit(date.startOf('month'));
        this.endDateUpdated.emit(date.endOf('month'));
        this.internalCurrentDate = date;
    }

    public get currentDate() {
        return this.internalCurrentDate;
    }

    public changeMonth(offset: number) {
        this.currentDate = this.currentDate.add(offset, 'M');
    }

    private getNumberOfDaysInMonth(year: string, month: string) {
        return dayjs(`${year}-${month}-01`).daysInMonth();
    }

    private get currentMonthDays() {
        return this.createDaysForCurrentMonth(
            this.currentYear,
            this.currentMonth
        );
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
            ...this.createDaysForPreviousMonth(
                this.currentYear,
                this.currentMonth
            ),
            ...this.currentMonthDays,
            ...this.createDaysForNextMonth(this.currentYear, this.currentMonth),
        ];
    }

    private createDaysForCurrentMonth(year: string, month: string) {
        return [...Array(this.getNumberOfDaysInMonth(year, month))].map(
            (day, index) => ({
                date: dayjs(`${year}-${month}-${index + 1}`).format(
                    'YYYY-MM-DD'
                ),
                dayOfMonth: index + 1,
                isCurrentMonth: true,
            })
        );
    }

    private getWeekday(date: any) {
        return dayjs(date).weekday();
    }

    private createDaysForPreviousMonth(year: string, month: string) {
        const firstDayOfTheMonthWeekday = this.getWeekday(
            this.currentMonthDays[0].date
        );

        const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, 'month');

        // Account for first day of the month on a Sunday (firstDayOfTheMonthWeekday === 0)
        const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
            ? firstDayOfTheMonthWeekday - 1
            : 6;
        const previousMonthLastMondayDayOfMonth = dayjs(
            this.currentMonthDays[0].date
        )
            .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
            .date();

        return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
            (day, index) => ({
                date: dayjs(
                    `${previousMonth.year()}-${previousMonth.month() + 1}-${
                        previousMonthLastMondayDayOfMonth + index
                    }`
                ).format('YYYY-MM-DD'),
                dayOfMonth: previousMonthLastMondayDayOfMonth + index,
                isCurrentMonth: false,
            })
        );
    }

    private createDaysForNextMonth(year: string, month: string) {
        const lastDayOfTheMonthWeekday = this.getWeekday(
            `${year}-${month}-${this.currentMonthDays.length}`
        );
        const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
            ? 7 - lastDayOfTheMonthWeekday
            : lastDayOfTheMonthWeekday;

        return [...Array(visibleNumberOfDaysFromNextMonth)].map(
            (day, index) => ({
                date: dayjs(`${year}-${Number(month) + 1}-${index + 1}`).format(
                    'YYYY-MM-DD'
                ),
                dayOfMonth: index + 1,
                isCurrentMonth: false,
            })
        );
    }
}
