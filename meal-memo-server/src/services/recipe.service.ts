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
            include: { all: true, nested: true },
            limit: limit,
            offset: page * limit,
            order: ['title'],
        });
    }

    async importRecipe(url: string): Promise<RecipeModel> {
        try {
            const collisions = await RecipeModel.findAll({
                where: {
                    url,
                },
                include: { all: true, nested: true },
            });
            console.log(collisions);
            if (collisions.length > 0) {
                const r = collisions[0];
                return Promise.resolve(collisions[0]);
            }
            const recipe = await parseRecipe(url);
            recipe.slug = slugify(recipe.title, { lower: true, strict: true });
            return await RecipeModel.create(recipe, {
                include: { all: true, nested: true },
            }).then((r) => {
                r.fresh = true;
                return r;
            });
        } catch {
            return null;
        }
    }

    async getRecipe(id: number): Promise<any> {
        return await RecipeModel.findByPk(id, {
            include: { all: true, nested: true },
        });
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
