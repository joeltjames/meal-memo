import { RecipeAttributes } from '@/interfaces/recipe.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class RecipeModel extends Model<RecipeAttributes> {
    public id: number;
    public title: string;
}

export default async (db: Sequelize): Promise<any> => {
    return RecipeModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize: db,
            modelName: 'Recipe',
            tableName: 'recipes',
        }
    );
};
