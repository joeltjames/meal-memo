import { Service, Inject } from 'typedi';
// import {
//     EventDispatcher,
//     EventDispatcherInterface,
// } from '@/decorators/eventDispatcher';
import { RecipeModel } from '@/models';
import { RecipeAttributes } from '@/interfaces/recipe.interface';
import { generateSchema } from '@/utils';
import slugify from 'slugify';
import { Op } from 'sequelize';

@Service()
export default class RecipeService {
    constructor(@Inject('logger') private logger) {}

    async getRecipes(filter?: string[], page = 0, limit = 50): Promise<any> {
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
        return generateSchema(RecipeModel);
    }
}
