import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ngx-drag-drop';
import { MealPlanRoutingModule } from '../meal-plan/meal-plan-routing.module';
import { UtilityModule } from '../utility/utility.module';
import { RecipesComponent } from './recipes.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';

@NgModule({
    declarations: [RecipesComponent, RecipeSearchComponent],
    imports: [
        CommonModule,
        RecipeRoutingModule,
        NgbModule,
        LayoutModule,
        UtilityModule,
        MealPlanRoutingModule,
        ReactiveFormsModule,
        DndModule,
        FontAwesomeModule,
    ],
    exports: [RecipeSearchComponent],
})
export class RecipesModule {}
