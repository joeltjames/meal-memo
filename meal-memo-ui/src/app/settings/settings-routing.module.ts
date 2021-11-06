import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { MealSettingsComponent } from './meal-settings/meal-settings.component';

const routes: Routes = [
    { path: '', component: AppSettingsComponent, children: [{ path: 'meals', component: MealSettingsComponent }] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
