import { Ingredient } from './Ingredient';
import { RecipeRevision } from './RecipeRevision';
import { BaseModel, ID } from './Base';
import { Model } from 'objection';

export class RecipeIngredientUse extends BaseModel {
  static get tableName() {
    return 'recipeIngredientUse';
  }

  ingredient: Ingredient;
  ingredientId: ID;

  recipeRevision: RecipeRevision;
  recipeRevisionId: ID;

  percentage: number;

  note: string;

  static get relationMappings() {
    return {
      revision: {
        relation: Model.BelongsToOneRelation,
        modelClass: RecipeRevision,
        join: {
          from: 'recipeIngredientUse.id',
          to: 'recipeRevision.id',
        },
      },
    };
  }
}
