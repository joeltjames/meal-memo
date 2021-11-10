import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealPlanRoutingModule } from './meal-plan-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { MealPlanCalendarComponent } from './meal-plan-calendar/meal-plan-calendar.component';
import { MealPlanComponent } from './meal-plan.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditDailyMealPlanModalComponent } from './edit-daily-meal-plan-modal/edit-daily-meal-plan-modal.component';
import { UtilityModule } from '../utility/utility.module';
import { WeeklyMealPlanComponent } from './weekly-meal-plan/weekly-meal-plan.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipesModule } from '../recipes/recipes.module';
import { MonthlyMealPlanComponent } from './monthly-meal-plan/monthly-meal-plan.component';
import { MealPlanCalendarPrintComponent } from './meal-plan-calendar-print/meal-plan-calendar-print.component';

@NgModule({
    declarations: [
        MonthlyMealPlanComponent,
        MealPlanComponent,
        MealPlanCalendarComponent,
        EditDailyMealPlanModalComponent,
        WeeklyMealPlanComponent,
        MealPlanCalendarPrintComponent,
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
        RecipesModule,
    ],
})
export class MealPlanModule {}
