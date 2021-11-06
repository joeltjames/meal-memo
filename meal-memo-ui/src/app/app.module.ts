import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MealPlanCalendarComponent } from './meal-plan-calendar/meal-plan-calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';
import { DndModule } from 'ngx-drag-drop';
import { MealPlanCalendarDropComponent } from './meal-plan-calendar-drop/meal-plan-calendar-drop.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        MealPlanComponent,
        DashboardComponent,
        RecipesComponent,
        ShoppingListComponent,
        AppSettingsComponent,
        UserProfileComponent,
        MealPlanCalendarComponent,
        MealPlanCalendarDropComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        DragulaModule.forRoot(),
        DndModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
