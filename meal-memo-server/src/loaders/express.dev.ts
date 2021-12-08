import { Application, Router, Response, Request } from 'express';
import config from '@/config';
import { Sequelize } from 'sequelize';
import { Container } from 'typedi';
import Logger from './logger';

export default ({ app }: { app: Application }) => {
    if (config.development) {
        console.log('Adding in the test routes!');
        const route = Router();
        route.get('/clear', (req: Request, res: Response) => {
            const toClear: string[] = Array.isArray(req.body) ? req.body : [];
            const cleared = [];
            Object.values((Container.get('db') as Sequelize).models)
                .filter(
                    (model) =>
                        !toClear ||
                        toClear.length == 0 ||
                        toClear.includes(model.name) ||
                        toClear.includes(model.tableName)
                )
                .map((model) => {
                    Logger.info(`Clearing '${model.tableName}' table`);
                    model.destroy({ truncate: true, restartIdentity: true });
                    cleared.push(model.tableName);
                });
            res.json(cleared).status(200).end();
        });
        app.use('/test', route);
    }
};
