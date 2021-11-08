import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { mealPlanReducer, mealReducer } from './meal-plan/store/meal-plan.reducer';
import { UtilityModule } from './utility/utility.module';
import { LayoutModule } from '@angular/cdk/layout';
import { recipeReducer } from './recipes/store/recipe.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipesModule } from './recipes/recipes.module';
import { MealPlanModule } from './meal-plan/meal-plan.module';
@NgModule({
    declarations: [AppComponent, NavbarComponent, DashboardComponent, ShoppingListComponent, UserProfileComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ mealPlan: mealPlanReducer, meal: mealReducer, recipe: recipeReducer }, {}),
        UtilityModule,
        LayoutModule,
        RecipesModule,
        MealPlanModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
