import { Batch } from './Batch';
import { Recipe } from './Recipe';
import { RecipeIngredientUse } from './RecipeIngredientUse';
import { User } from './User';
import { BaseModel, ID } from './Base';
import { IsDecimal, IsInt, IsString, Max, Min } from 'class-validator';
import { Model } from 'objection';

export class RecipeRevision extends BaseModel {
  static get tableName() {
    return 'recipeRevision';
  }

  @IsString()
  name: string;

  @IsInt()
  revisionNumber: number;

  @IsInt()
  suggestedSteepHours: number;

  @IsDecimal()
  @Min(0)
  @Max(1)
  suggestedVg: number;

  shakeAndVapable: boolean;

  recipe: Recipe;
  recipeId: ID;

  ingredients: RecipeIngredientUse[];

  batches: Batch[];

  createdAt: string;

  updatedAt: string;

  createdBy: User;
  createdById: ID;

  static get relationMappings() {
    return {
      recipe: {
        relation: Model.BelongsToOneRelation,
        modelClass: Recipe,
        join: {
          from: 'recipeRevision.recipeId',
          to: 'recipe.id',
        },
      },
      ingredients: {
        relation: Model.HasManyRelation,
        modelClass: RecipeIngredientUse,
        join: {
          from: 'recipeRevision.id',
          to: 'recipeIngredientUse.recipeRevisionId',
        },
      },
      createdBy: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'recipeRevision.createdById',
          to: 'user.id',
        },
      },
    };
  }
}
