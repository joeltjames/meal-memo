import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { MealSettingsComponent } from './meal-settings/meal-settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragulaModule } from 'ng2-dragula';
import { MealEditModalComponent } from './meal-settings/meal-edit-modal/meal-edit-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
@NgModule({
    declarations: [
        AppSettingsComponent,
        MealSettingsComponent,
        MealEditModalComponent,
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        FontAwesomeModule,
        DragulaModule,
        ReactiveFormsModule,
        ColorPickerModule,
    ],
})
export class SettingsModule {}
