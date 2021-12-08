import {
    IngredientAttributes,
    InstructionAttributes,
    NutrientAttributes,
    RecipeAttributes,
} from '@/interfaces/recipe.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class Product extends Model {}
export class User extends Model {}
export class Address extends Model {}
export class RecipeModel extends Model<RecipeAttributes> {}
export class NutrientModel extends Model<NutrientAttributes> {}
export class IngredientModel extends Model<IngredientAttributes> {}
export class InstructionModel extends Model<InstructionAttributes> {}

export default async (sequelize: Sequelize): Promise<any> => {
    NutrientModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            calories: {
                type: DataTypes.TEXT({ length: 'long' }),
            },
            servingSize: {
                type: DataTypes.TEXT({ length: 'long' }),
            },
            carbohydrateContent: {
                type: DataTypes.TEXT({ length: 'long' }),
            },
            proteinContent: {
                type: DataTypes.TEXT({ length: 'long' }),
            },
            fatContent: {
                type: DataTypes.TEXT({ length: 'long' }),
            },
            cholesterolContent: {
                type: DataTypes.TEXT({ length: 'long' }),
            },
            sodiumContent: {
                type: DataTypes.TEXT({ length: 'long' }),
            },
            fiberContent: {
                type: DataTypes.TEXT({ length: 'long' }),
            },
            sugarContent: {
                type: DataTypes.TEXT({ length: 'long' }),
            },
        },
        {
            sequelize,
            modelName: 'Nutrient',
            tableName: 'nutrients',
        }
    );

    InstructionModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            text: DataTypes.TEXT({ length: 'long' }),
            isHeader: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Instruction',
            tableName: 'instructions',
        }
    );

    IngredientModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            quantity: {
                type: DataTypes.DOUBLE,
            },
            quantity2: {
                type: DataTypes.DOUBLE,
            },
            unitOfMeasure: {
                type: DataTypes.TEXT({ length: 'long' }),
            },
            description: {
                type: DataTypes.TEXT({ length: 'long' }),
            },
        },
        {
            sequelize,
            modelName: 'Ingredient',
            tableName: 'ingredients',
        }
    );

    const recipeModel = RecipeModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.TEXT({ length: 'long' }),
                allowNull: false,
            },
            slug: DataTypes.TEXT({ length: 'long' }),
            image: DataTypes.TEXT({ length: 'long' }),
            totalTime: DataTypes.INTEGER.UNSIGNED,
            yields: DataTypes.TEXT({ length: 'long' }),
            url: DataTypes.TEXT({ length: 'long' }),
        },
        {
            sequelize,
            modelName: 'Recipe',
            tableName: 'recipes',
        }
    );

    RecipeModel.hasOne(NutrientModel, {
        as: 'nutrients',
    });
    RecipeModel.hasMany(IngredientModel, {
        as: 'ingredients',
    });
    RecipeModel.hasMany(InstructionModel, {
        as: 'instructions',
    });

    return recipeModel;
};
