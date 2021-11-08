import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealPlanRoutingModule } from './meal-plan-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { MealPlanCalendarComponent } from './meal-plan-calendar/meal-plan-calendar.component';
import { MealPlanComponent } from './meal-plan.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MealPlanCalendarDailyModalComponent } from './meal-plan-calendar-daily-modal/meal-plan-calendar-daily-modal.component';
import { UtilityModule } from '../utility/utility.module';
import { WeeklyMealPlanComponent } from './weekly-meal-plan/weekly-meal-plan.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        MealPlanComponent,
        MealPlanCalendarComponent,
        MealPlanCalendarDailyModalComponent,
        WeeklyMealPlanComponent,
    ],
    imports: [
        NgbModule,
        CommonModule,
        LayoutModule,
        UtilityModule,
        MealPlanRoutingModule,
        ReactiveFormsModule,
        DndModule,
        FontAwesomeModule,
    ],
})
export class MealPlanModule {}
