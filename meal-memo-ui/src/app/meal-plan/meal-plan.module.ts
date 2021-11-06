import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealPlanRoutingModule } from './meal-plan-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { MealPlanCalendarComponent } from './meal-plan-calendar/meal-plan-calendar.component';
import { MealPlanComponent } from './meal-plan.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MealPlanCalendarDailyModalComponent } from './meal-plan-calendar-daily-modal/meal-plan-calendar-daily-modal.component';

@NgModule({
    declarations: [MealPlanComponent, MealPlanCalendarComponent, MealPlanCalendarDailyModalComponent],
    imports: [CommonModule, MealPlanRoutingModule, ReactiveFormsModule, DndModule, FontAwesomeModule],
})
export class MealPlanModule {}
