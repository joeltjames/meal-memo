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
import { NgxMasonryModule } from 'ngx-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipePrintComponent } from './recipe-print/recipe-print.component';
import { CreateRecipeModalComponent } from './create-recipe-modal/create-recipe-modal.component';

@NgModule({
    declarations: [RecipesComponent, RecipeSearchComponent, RecipeDetailComponent, RecipePrintComponent, CreateRecipeModalComponent],
    imports: [
        CommonModule,
        NgbModule,
        LayoutModule,
        UtilityModule,
        MealPlanRoutingModule,
        ReactiveFormsModule,
        DndModule,
        FontAwesomeModule,
        NgxMasonryModule,
    ],
    exports: [RecipeSearchComponent],
})
export class RecipesModule {}
