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

let sampleRecipes: Recipe[] = [];
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
            if (
                mutableState.all.findIndex((r) => r.id === props.recipe.id) < 0
            ) {
                mutableState.all.push(props.recipe);
            }
            if (
                (!state.currentFilterCriteria ||
                    props.recipe.title
                        .toLowerCase()
                        .includes(
                            state.currentFilterCriteria?.toLowerCase()
                        )) &&
                mutableState.filtered &&
                mutableState.filtered.findIndex(
                    (r) => r.id === props.recipe.id
                ) < 0
            ) {
                mutableState.filtered.push(props.recipe);
            }
            return mutableState;
        }
    )
);

export const recipeReducer = (state: any, action: any) =>
    internalRecipeReducer(state, action);
