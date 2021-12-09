import { Identifiable } from '../utils';

export interface Recipe extends Identifiable {
    info?: string;
    title: string;
    slug: string;
    yields: string;
    tags?: string[];
    ingredients?: Ingredient[];
    instructions?: Instruction[];
    image: string;
    host: string;
    nutrients: Nutrients;
    url: string;
    fresh?: boolean;
}
export interface Instruction extends Identifiable {
    text: string;
    isHeader: boolean;
}
export interface Ingredient extends Identifiable {
    quantity?: number;
    quantity2?: number;
    unitOfMeasure?: string;
    description: string;
    isHeader?: boolean;
}
export interface Nutrients extends Identifiable {
    servingSize?: string | null;
    calories: string;
    carbohydrateContent?: string | null;
    proteinContent?: string | null;
    fatContent?: string | null;
    cholesterolContent?: string | null;
    sodiumContent?: string | null;
    fiberContent?: string | null;
    sugarContent?: string | null;
    saturatedFatContent?: string | null;
}
