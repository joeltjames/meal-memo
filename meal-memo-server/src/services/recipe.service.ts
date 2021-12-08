import { Service, Inject } from 'typedi';
// import {
//     EventDispatcher,
//     EventDispatcherInterface,
// } from '@/decorators/eventDispatcher';
import { IngredientModel, NutrientModel, RecipeModel } from '@/models';
import { RecipeAttributes } from '@/interfaces/recipe.interface';
import { generateSchema, parseRecipe } from '@/utils';
import slugify from 'slugify';
import { Op } from 'sequelize';
import { Product, User } from '@/models/recipe.model';

@Service()
export default class RecipeService {
    constructor(@Inject('logger') private logger) {}

    async getRecipes(
        filter?: string[],
        page = 0,
        limit = 50
    ): Promise<RecipeModel[]> {
        return await RecipeModel.findAll({
            where: {
                title: {
                    [Op.or]: filter.map((f) => ({ [Op.substring]: f })),
                },
            },
            limit: limit,
            offset: page * limit,
            order: ['title'],
        });
    }

    async importRecipe(url: string): Promise<RecipeModel> {
        try {
            const recipe = await parseRecipe(url);
            recipe.slug = slugify(recipe.title, { lower: true, strict: true });
            console.log(recipe);
            return await RecipeModel.create(recipe, {
                include: { all: true, nested: true },
            });
        } catch {
            return null;
        }
    }

    async getRecipe(id: number): Promise<any> {
        return await RecipeModel.findByPk(id);
    }

    async createRecipe(body: RecipeAttributes) {
        body.slug = slugify(body.title, { lower: true, strict: true });
        return await RecipeModel.create(body);
    }

    async updateRecipe(body: RecipeAttributes) {
        body.slug = slugify(body.title);
        await RecipeModel.update(body, {
            where: {
                id: body.id,
            },
        });
        return await RecipeModel.findByPk(body.id);
    }

    getRecipeSchema() {
        // return generateSchema(RecipeModel);
        return {};
    }
}
