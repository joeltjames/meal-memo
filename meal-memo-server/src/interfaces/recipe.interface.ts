export interface RecipeAttributes {
    id?: number;
    title: string;
    slug?: string;
    image?: string;
    totalTime?: number;
    yields?: string;
    url?: string;
    nutrients?: NutrientAttributes;
    ingredients?: IngredientAttributes[];
    instructions?: InstructionAttributes[];
}

export interface InstructionAttributes {
    id?: number;
    text?: string;
    isHeader?: boolean;
    num?: number;
}

export interface IngredientAttributes {
    id?: number;
    quantity?: number;
    quantity2?: number;
    unitOfMeasure?: string;
    description: string;
}

export interface NutrientAttributes {
    id?: number;
    calories: string;
    servingSize?: string;
    carbohydrateContent?: string;
    proteinContent?: string;
    fatContent?: string;
    cholesterolContent?: string;
    sodiumContent?: string;
    fiberContent?: string;
    sugarContent?: string;
}
