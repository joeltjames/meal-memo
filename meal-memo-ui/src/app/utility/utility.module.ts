import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { MonthDatePickerComponent } from './month-date-picker/month-date-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DayCellContentDirective } from './calendar/day-cell-content.directive';

@NgModule({
    declarations: [CalendarComponent, MonthDatePickerComponent, DayCellContentDirective],
    imports: [CommonModule, NgbModule, ReactiveFormsModule],
    exports: [CalendarComponent],
})
export class UtilityModule {}
