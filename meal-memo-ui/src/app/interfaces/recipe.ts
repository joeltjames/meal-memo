export interface Recipe {
    id: number;
    info?: string;
    title: string;
    slug: string;
    yields: string;
    tags?: string[];
    ingredients?: string[] | null;
    instructions?: string[] | null;
    image: string;
    host: string;
    nutrients: Nutrients;
    url: string;
}
export interface Nutrients {
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
