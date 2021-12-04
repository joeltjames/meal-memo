import { Sequelize } from 'sequelize';
// import config from 'src/config';

export default async (): Promise<Sequelize> => {
    return new Sequelize(
        'sqlite:/Users/jjames/Development/Projects/meal-memo/meal-memo-server/db/test.db'
    );
};
