import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as dayjs from 'dayjs';

interface MonthYear {
    year: number;
    month: number;
}

@Component({
    selector: 'app-month-date-picker',
    templateUrl: './month-date-picker.component.html',
    styleUrls: ['./month-date-picker.component.scss'],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MonthDatePickerComponent), multi: true }],
})
export class MonthDatePickerComponent implements ControlValueAccessor {
    public years: number[] = [];
    public selectedYear = new FormControl(dayjs().format('YYYY'));
    public selectedMonth = dayjs().get('month');

    constructor() {
        for (let i = 2020; i < 2030; i++) {
            this.years.push(i);
        }
        this.selectedYear.valueChanges.subscribe((val) => {
            this.onTouch(val);
        });
    }

    writeValue(value: MonthYear): void {
        this.selectedYear.setValue(value.year);
        this.selectedMonth = value.month;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public emitValue(month: number) {
        this.selectedMonth = month;
        const value: MonthYear = {
            year: this.selectedYear.value,
            month,
        };
        this.onChange(value);
    }

    private onChange = (value: MonthYear) => {};
    private onTouch = (value: MonthYear) => {};
}
