import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
    { path: 'meal-plan', component: MealPlanComponent },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'settings', component: AppSettingsComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: '**', component: DashboardComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
