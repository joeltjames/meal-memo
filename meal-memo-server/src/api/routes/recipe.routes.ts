import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '@/services/auth.service';
import middlewares from '../middlewares';
import { Logger } from 'winston';
import RecipeService from '@/services/recipe.service';

const route = Router();

export default (app: Router) => {
    console.log('registering recipes');

    route.get('/test', async (_: Request, res: Response) => {
        const recipeService = Container.get(RecipeService);
        const recipes = await recipeService.getRecipes();
        res.json(recipes).status(200).end();
    });

    app.use('/recipes', route);

    console.log('hey hey hey 2');
};
