import { IngredientAttributes } from "@/interfaces/recipe.interface";
import { DataTypes, Model, Sequelize } from "sequelize";



export default async (db: Sequelize): Promise<any> => {
    // const ingredientModel = 

    // const nutrientModel = await NutrientModel.init(
    //     {
    //         id: {
    //             type: DataTypes.INTEGER.UNSIGNED,
    //             autoIncrement: true,
    //             primaryKey: true,
    //         },
    //         calories: {
    //             type: DataTypes.STRING,
    //         },
    //         servingSize: {
    //             type: DataTypes.STRING,
    //         },
    //         carbohydrateContent: {
    //             type: DataTypes.STRING,
    //         },
    //         proteinContent: {
    //             type: DataTypes.STRING,
    //         },
    //         fatContent: {
    //             type: DataTypes.STRING,
    //         },
    //         cholesterolContent: {
    //             type: DataTypes.STRING,
    //         },
    //         sodiumContent: {
    //             type: DataTypes.STRING,
    //         },
    //         fiberContent: {
    //             type: DataTypes.STRING,
    //         },
    //         sugarContent: {
    //             type: DataTypes.STRING,
    //         },
    //     },
    //     {
    //         sequelize: db,
    //         modelName: 'Nutrient',
    //         tableName: 'nutrients',
    //     }
    // );

    // const recipeModel = await RecipeModel.init(
    //     {
    //         id: {
    //             type: DataTypes.INTEGER.UNSIGNED,
    //             autoIncrement: true,
    //             primaryKey: true,
    //         },
    //         title: {
    //             type: DataTypes.STRING,
    //             allowNull: false,
    //         },
    //         slug: {
    //             type: DataTypes.STRING,
    //         },
    //         image: {
    //             type: DataTypes.STRING,
    //         },
    //     },
    //     {
    //         sequelize: db,
    //         modelName: 'Recipe',
    //         tableName: 'recipes',
    //     }
    // );

    // RecipeModel.hasOne(NutrientModel);

    // RecipeModel.hasMany(IngredientModel);


    // return ingredientModel;
};
