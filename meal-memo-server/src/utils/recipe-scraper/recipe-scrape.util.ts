import {
    IngredientAttributes,
    RecipeAttributes,
} from '@/interfaces/recipe.interface';
import { spawn } from 'child_process';
import parseIngredient, { Ingredient } from 'parse-ingredient';
import { join } from 'path';

interface PythonRecipe {
    title: string;
    totalTimeMin?: number;
    yields: string;
    ingredients: string[];
    instructions: string[];
    image: string;
    nutrients: {
        calories: string;
        servingSize?: string;
        carbohydrateContent?: string;
        proteinContent?: string;
        fatContent?: string;
        cholesterolContent?: string;
        sodiumContent?: string;
        fiberContent?: string;
        sugarContent?: string;
    };
    url: string;
}

export function parseRecipe(url: string): Promise<RecipeAttributes> {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('pipenv', [
            'run',
            'python',
            join(__dirname, `recipe-scrape.py`),
            url,
        ]);
        pythonProcess.on('exit', (code) => {
            if (code !== 0) {
                reject();
            }
        });
        pythonProcess.stderr.on('data', (data) => {
            console.log(data.toString());
        });
        pythonProcess.stdout.on('data', (data) => {
            const json:
                | {
                      success: true;
                      recipe: PythonRecipe;
                  }
                | { success: false } = JSON.parse(data.toString());
            if (json.success) {
                console.log(json);
                resolve({
                    title: json.recipe.title,
                    image: json.recipe.image,
                    totalTime: json.recipe.totalTimeMin,
                    yields: json.recipe.yields,
                    url: json.recipe.url,
                    nutrients: json.recipe.nutrients,
                    ingredients: json.recipe.ingredients
                        .map((ing: string) =>
                            parseIngredient(ing, { normalizeUOM: true })
                        )
                        .reduce(
                            (a: Ingredient[], b: Ingredient[]) => a.concat(b),
                            []
                        )
                        .map((ing: Ingredient) => {
                            delete ing.isGroupHeader;
                            return ing as IngredientAttributes;
                        }),
                    instructions: json.recipe.instructions.map((str) => ({
                        text: str,
                    })),
                });
            } else {
                reject(json);
            }
        });
    });
}
