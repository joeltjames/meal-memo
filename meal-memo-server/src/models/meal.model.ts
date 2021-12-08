import { MealAttributes } from '@/interfaces/meal.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class MealModel extends Model<MealAttributes> {
    public id: number;
    public name: string;
}

export default async (db: Sequelize): Promise<any> => {
    return MealModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize: db,
            modelName: 'Meal',
            tableName: 'meals',
        }
    );
};
