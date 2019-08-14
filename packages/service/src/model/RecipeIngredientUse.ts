import { Ingredient } from './Ingredient';
import { RecipeRevision } from './RecipeRevision';
import { BaseModel } from './Base';

export class RecipeIngredientUse extends BaseModel {
  static get tableName() {
    return 'recipeIngredientUse';
  }

  ingredient: Ingredient;

  recipeRevision: RecipeRevision;

  percentage: number;

  note: string;
}
