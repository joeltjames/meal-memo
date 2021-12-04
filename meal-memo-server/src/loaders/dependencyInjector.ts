import { Sequelize } from 'sequelize';
import { Container } from 'typedi';
// import formData from 'form-data';
// import Mailgun from 'mailgun.js';
import LoggerInstance from './logger';
// import agendaFactory from './agenda';
// import config from '@/config';

export default ({ db }: { db: Sequelize }) => {
    try {
        Container.set('db', db);

        Object.keys(db.models).forEach((key) => {
            const name = `${key.toLowerCase()}Model`;
            Container.set(name, db.models[key]);
        });

        Container.set('logger', LoggerInstance);

        // const agendaInstance = agendaFactory({ mongoConnection });
        // const mgInstance = new Mailgun(formData);

        // Container.set('agendaInstance', agendaInstance);
        // Container.set(
        //     'emailClient',
        //     mgInstance.client({
        //         key: config.emails.apiKey,
        //         username: config.emails.apiUsername,
        //     })
        // );
        // Container.set('emailDomain', config.emails.domain);
        // LoggerInstance.info('✌️ Agenda injected into container');

        // return { agenda: agendaInstance };
        return {};
    } catch (e) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
