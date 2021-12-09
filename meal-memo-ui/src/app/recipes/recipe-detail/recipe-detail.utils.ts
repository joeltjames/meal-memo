import { FormControl, FormGroup } from '@angular/forms';
import { Recipe } from 'src/app/interfaces/recipe';

export const recipeToForm = (recipe: Recipe | undefined) =>
    new FormGroup({
        title: new FormControl(recipe?.title),
        calories: new FormControl(recipe?.nutrients.calories),
        servingSize: new FormControl(recipe?.nutrients.servingSize),
        yields: new FormControl(recipe?.yields),
        description: new FormControl(recipe?.info),
    });
