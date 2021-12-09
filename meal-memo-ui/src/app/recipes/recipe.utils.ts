import { Ingredient } from '../interfaces/recipe';

export const formatIngredient = (ing: Ingredient) => {
    let str = '';
    if (ing.quantity) {
        str += ing.quantity;
        if (ing.quantity2) {
            str += ` - ${ing.quantity2}`;
        }
    }
    if (ing.unitOfMeasure) {
        str += ` ${ing.unitOfMeasure}`;
    }
    str += ` ${ing.description}`;
    return str.trim();
};
