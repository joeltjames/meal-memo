import {
    JsonSchemaManager,
    JsonSchema7Strategy,
} from '@alt3/sequelize-to-json-schemas';
import { Model } from 'sequelize';

export default (model: any) => {
    const schemaManager = new JsonSchemaManager();
    let schema = schemaManager.generate(model, new JsonSchema7Strategy(), {
        exclude: ['createdAt', 'updatedAt'],
        associations: true,
    });
    delete schema['$id'];
    delete schema['$schema'];
    return schema;
};
