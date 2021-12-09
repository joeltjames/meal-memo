import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { StoreModule } from '@ngrx/store';
import {
    mealPlanReducer,
    mealReducer,
} from './meal-plan/store/meal-plan.reducer';
import { UtilityModule } from './utility/utility.module';
import { LayoutModule } from '@angular/cdk/layout';
import { recipeReducer } from './recipes/store/recipe.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipesModule } from './recipes/recipes.module';
import { MealPlanModule } from './meal-plan/meal-plan.module';
import { DragulaModule } from 'ng2-dragula';
import { ColorPickerModule } from 'ngx-color-picker';
import { EffectsModule } from '@ngrx/effects';
import { RecipeEffects } from './recipes/store/recipe.effects';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './toast/toast.service';
import { AutosizeModule } from 'ngx-autosize';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DashboardComponent,
        ShoppingListComponent,
        UserProfileComponent,
        ToastComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        DragulaModule.forRoot(),
        StoreModule.forRoot(
            {
                mealPlan: mealPlanReducer,
                meal: mealReducer,
                recipe: recipeReducer,
            },
            {}
        ),
        EffectsModule.forRoot([RecipeEffects]),
        UtilityModule,
        LayoutModule,
        RecipesModule,
        MealPlanModule,
        ColorPickerModule,
        AutosizeModule,
    ],
    providers: [ToastService],
    bootstrap: [AppComponent],
})
export class AppModule {}
