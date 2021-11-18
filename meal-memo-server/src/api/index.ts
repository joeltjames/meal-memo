import { Router } from 'express';
import recipe from './routes/recipe.routes';

export default () => {
    const app = Router();
    recipe(app);

    return app;
};
