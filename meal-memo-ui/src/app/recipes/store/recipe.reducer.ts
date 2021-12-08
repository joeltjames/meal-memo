/* eslint-disable max-len */
import { ngModuleJitUrl } from '.pnpm/@angular+compiler@11.1.2/node_modules/@angular/compiler';
import { createReducer, on } from '@ngrx/store';
import { Recipe } from 'src/app/interfaces/recipe';
import {
    importRecipe,
    ImportRecipeProps,
    ImportRecipeResultProps,
    recipeImportSuccess,
    recipesLoadedSuccess,
    RecipesLoadedSuccessProps,
    recipesSearchedSuccess,
    SearchRecipeProps,
    searchRecipes,
} from './recipe.actions';

let sampleRecipes: Recipe[] = [
    {
        id: 4,
        title: 'Skinny Chocolate Chip Buttermilk Scones',
        slug: 'skinny-chocolate-chip-buttermilk-scones',
        yields: '12 serving(s)',
        ingredients: [
            '3/4 cup cold buttermilk',
            '1/4 cup sugar',
            '2 tsp vanilla extract',
            '1 large egg',
            '1 cup all purpose flour',
            '1 cup white whole wheat flour',
            '1 tbsp baking powder',
            '1/2 tsp salt',
            '3 tbsp chilled butter (must be cold cut into small pieces)',
            '3/4 cup chocolate chips',
            'cooking spray',
            '1 large egg white (lightly beaten)',
            '1 1/2 tbsp sugar',
        ],
        instructions: [
            'Preheat oven to 375°F.',
            'Combine the first four ingredients in a medium bowl, stirring with a whisk.',
            'Spray baking sheet with cooking spray.',
            'Combine flour, baking powder, salt, in a large bowl, stirring with a whisk. Cut in chilled butter with a pastry blender, or you could use 2 knives, until the mixture resembles coarse meal.',
            'Gently fold in chocolate chips. Add milk mixture, stirring just until moist.',
            'Place dough onto a floured surface and knead lightly four times with floured hands.',
            'Form dough into an 9-inch circle onto baking sheet, about 3/4" thick.',
            'Using a knife, cut dough into 12 wedges all the way through.',
            'Brush egg white over dough and sprinkle evenly with sugar.',
            'Bake until golden, about 18-20 minutes, depending on your oven. Serve warm.',
        ],
        image: 'https://www.skinnytaste.com/wp-content/uploads/2012/01/skinny-chocolate-chip-scones.jpg',
        host: 'skinnytaste.com',
        nutrients: {
            servingSize: '1 scone',
            calories: '199.5 kcal',
            carbohydrateContent: '30 g',
            proteinContent: '3.5 g',
            fatContent: '8 g',
            saturatedFatContent: '5 g',
            cholesterolContent: '24 mg',
            sodiumContent: '257.5 mg',
            fiberContent: '2.5 g',
            sugarContent: '13 g',
        },
        url: 'https://www.skinnytaste.com/skinny-chocolate-chip-buttermilk-scones/',
    },
];
sampleRecipes = sampleRecipes.map((r) => {
    r.info = 'This is some sample info!!';
    return r;
});
export type RecipeState = {
    all: Recipe[];
    filtered?: Recipe[];
    currentFilterCriteria?: string;
    importInProgress: boolean;
    lastImported?: Recipe;
};

const initialRecipeState: RecipeState = {
    all: sampleRecipes,
    importInProgress: false,
};

const internalRecipeReducer = createReducer(
    initialRecipeState,
    on(
        recipesLoadedSuccess,
        (state: RecipeState, props: RecipesLoadedSuccessProps) => {
            const mutableState = JSON.parse(
                JSON.stringify(state)
            ) as RecipeState;
            mutableState.all.push(...props.recipes);
            mutableState.all = mutableState.all.filter(
                (recipe, index, list) =>
                    list.findIndex((r) => r.id === recipe.id) === index
            );
            return mutableState;
        }
    ),
    on(
        recipesSearchedSuccess,
        (state: RecipeState, props: RecipesLoadedSuccessProps) => {
            const mutableState = JSON.parse(
                JSON.stringify(state)
            ) as RecipeState;
            mutableState.filtered = props.recipes;
            return mutableState;
        }
    ),
    on(importRecipe, (state: RecipeState, props: ImportRecipeProps) => {
        const mutableState = JSON.parse(JSON.stringify(state)) as RecipeState;
        mutableState.importInProgress = true;
        delete mutableState.lastImported;
        return mutableState;
    }),
    on(searchRecipes, (state: RecipeState, props: SearchRecipeProps) => {
        const mutableState = JSON.parse(JSON.stringify(state)) as RecipeState;
        mutableState.currentFilterCriteria = props.filter;
        return mutableState;
    }),
    on(
        recipeImportSuccess,
        (state: RecipeState, props: ImportRecipeResultProps) => {
            const mutableState = JSON.parse(
                JSON.stringify(state)
            ) as RecipeState;
            mutableState.importInProgress = false;
            mutableState.lastImported = props.recipe;
            mutableState.all.push(props.recipe);
            if (
                !state.currentFilterCriteria ||
                props.recipe.title
                    .toLowerCase()
                    .includes(state.currentFilterCriteria?.toLowerCase())
            ) {
                mutableState.filtered?.push(props.recipe);
            }
            return mutableState;
        }
    )
);

export const recipeReducer = (state: any, action: any) =>
    internalRecipeReducer(state, action);
