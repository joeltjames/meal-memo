import recipe, { IngredientModel, NutrientModel, RecipeModel } from './recipe.model';
import meal, { MealModel } from './meal.model';

export { RecipeModel, IngredientModel, MealModel, NutrientModel };

export const models = [recipe, meal];
