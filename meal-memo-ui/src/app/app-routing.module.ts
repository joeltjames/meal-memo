import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSettingsComponent } from './settings/app-settings/app-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipePrintComponent } from './recipes/recipe-print/recipe-print.component';
import { MealPlanCalendarPrintComponent } from './meal-plan/meal-plan-calendar-print/meal-plan-calendar-print.component';

const routes: Routes = [
    { path: 'meal-plan', component: MealPlanComponent },
    { path: 'meal-plan/print', component: MealPlanCalendarPrintComponent, outlet: 'print' },
    { path: 'settings', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule) },
    {
        path: 'recipes',
        component: RecipesComponent,
    },
    {
        path: 'recipes/:slug',
        component: RecipeDetailComponent,
    },
    { path: 'recipes/:slug/print', component: RecipePrintComponent, outlet: 'print' },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'settings', component: AppSettingsComponent },
    { path: 'profile', component: UserProfileComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
