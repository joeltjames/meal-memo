import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeState } from './recipe.reducer';

const recipeFilterFunction = (recipe: Recipe, filterCriteria: string) => {
    const titleMatches = recipe.title.toLowerCase().includes(filterCriteria.toLowerCase());
    const anyTagMatches = recipe.tags?.find((tag) => tag.toLowerCase() === filterCriteria.toLowerCase());
    return titleMatches || anyTagMatches;
};

export const recipeSelector = createFeatureSelector<RecipeState>('recipe');

export const filteredRecipeSelector = (filterCriteria: string) =>
    createSelector(recipeSelector, (recipes) =>
        recipes.filter((recipe) => recipeFilterFunction(recipe, filterCriteria))
    );
    
export const recipeBySlugSelector = (slug: string) =>
    createSelector(recipeSelector, (recipes) =>
        recipes.find((recipe) => recipe.slug.toLowerCase() === slug.toLowerCase())
    );
