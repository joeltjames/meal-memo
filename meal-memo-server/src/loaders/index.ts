import expressLoader from './express';
import expressDevLoader from './express.dev';
import dependencyInjectorLoader from './dependencyInjector';
import sequelize from './sequelize';
// import mongooseLoader from './mongoose';
// import jobsLoader from './jobs';
import models from '@/models';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {
    const db = await sequelize();

    models.map(async (model) => await model(db));

    db.sync({ force: true });

    dependencyInjectorLoader({ db });

    Logger.info('✌️ Dependency Injector loaded');

    await expressLoader({ app: expressApp });

    Logger.info('✌️ Express loaded');

    await expressDevLoader({ app: expressApp });

    Logger.info('✌️ Express Dev Routes loaded');

    return expressApp;
};
