import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { MealSettingsComponent } from './meal-settings/meal-settings.component';

@NgModule({
    declarations: [AppSettingsComponent, MealSettingsComponent],
    imports: [CommonModule, SettingsRoutingModule],
})
export class SettingsModule {}
