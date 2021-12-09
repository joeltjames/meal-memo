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
import { RecipeMenuComponent } from './recipe-menu/recipe-menu.component';
import { ImportRecipeModalComponent } from './import-recipe-modal/import-recipe-modal.component';
import { AutosizeModule } from 'ngx-autosize';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeSearchComponent,
        RecipeDetailComponent,
        RecipePrintComponent,
        RecipeMenuComponent,
        ImportRecipeModalComponent,
    ],
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
        AutosizeModule,
    ],
    exports: [RecipeSearchComponent],
})
export class RecipesModule {}
