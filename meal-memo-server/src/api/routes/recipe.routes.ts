import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import RecipeService from 'src/services/recipe.service';
import { ValidationError, Validator } from 'express-json-validator-middleware';
import { isArrayOfStrings } from '@/utils';

const route = Router();

export default async (app: Router) => {
    const { validate } = new Validator({ unknownFormats: ['int32'] });

    const recipeService = Container.get(RecipeService);
    // const recipeSchema = recipeService.getRecipeSchema();

    // route.get('/schema', (_: Request, res: Response) => {
    //     res.json(recipeSchema).status(200).end();
    // });

    route.get('', async (req: Request, res: Response) => {
        let filter: string[] = [];
        if (req.query.filter) {
            if (isArrayOfStrings(req.query.filter)) {
                filter = req.query.filter;
            } else if (typeof req.query.filter === 'string') {
                filter = [req.query.filter];
            }
        }
        let page = 0;
        if (req.query.page) {
            if (isArrayOfStrings(req.query.filter)) {
                page = parseInt(req.query.filter[0]);
            } else if (typeof req.query.filter === 'string') {
                page = parseInt(req.query.filter);
            }
        }
        let limit = 50;
        if (req.query.limit) {
            if (isArrayOfStrings(req.query.filter)) {
                limit = parseInt(req.query.filter[0]);
            } else if (typeof req.query.filter === 'string') {
                limit = parseInt(req.query.filter);
            }
        }
        const recipeService = Container.get(RecipeService);
        const recipes = await recipeService.getRecipes(filter, page, limit);
        res.json(recipes || []).status(200).end();
    });

    route.post(
        '/import',
        async (req: Request, res: Response) => {
            const recipeService = Container.get(RecipeService);
            const recipe = await recipeService.importRecipe(req.body.url);
            res.json(recipe).status(200).end();
        }
    );

    route.post(
        '',
        // validate({ body: recipeSchema }),
        async (req: Request, res: Response) => {
            const recipeService = Container.get(RecipeService);
            const recipe = await recipeService.createRecipe(req.body);
            res.json(recipe).status(200).end();
        }
    );
    

    route.get('/:recipeId', async (req: Request, res: Response) => {
        const recipe = await recipeService.getRecipe(
            parseInt(req.params['recipeId'])
        );
        res.json(recipe).status(200).end();
    });

    route.put(
        '/:recipeId',
        // validate({ body: recipeSchema }),
        async (req: Request, res: Response) => {
            const recipeService = Container.get(RecipeService);
            const recipeAttr = req.body;
            recipeAttr.id = parseInt(req.params['recipeId']);
            const recipe = await recipeService.updateRecipe(recipeAttr);
            res.json(recipe).status(200).end();
        }
    );

    app.use('/recipes', route);
};
