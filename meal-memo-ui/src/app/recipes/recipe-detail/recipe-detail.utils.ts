import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Recipe } from 'src/app/interfaces/recipe';

export const recipeToForm = (recipe: Recipe | undefined) =>
    new FormGroup({
        title: new FormControl(recipe?.title),
        calories: new FormControl(recipe?.nutrients.calories),
        servingSize: new FormControl(recipe?.nutrients.servingSize),
        yields: new FormControl(recipe?.yields),
        description: new FormControl(recipe?.info),
        ingredients: new FormArray(
            [...(recipe?.ingredients || [])]
                ?.sort((a, b) => a.id - b.id)
                .map(
                    (ing) =>
                        new FormGroup({
                            quantity: new FormControl(ing.quantity),
                            unitOfMeasure: new FormControl(ing.unitOfMeasure),
                            description: new FormControl(ing.description),
                            header: new FormControl(ing.isHeader)
                        })
                )
        ),
    });
