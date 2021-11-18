import { Sequelize } from 'sequelize';
// import config from '@/config';

export default async (): Promise<Sequelize> => {
    return new Sequelize('sqlite::memory:');
};
