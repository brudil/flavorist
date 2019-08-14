import { RecipeRevision } from './RecipeRevision';
import { BatchIngredientUse } from './BatchIngredientUse';
import { Namespace } from './Namespace';
import { User } from './User';
import { BaseModel } from './Base';

export class Batch extends BaseModel {
  static get tableName() {
    return 'batch';
  }

  recipeRevision: RecipeRevision;

  namespace: Namespace;

  user: User;

  volume: number;

  ingredients: BatchIngredientUse[];

  createdAt: Date;

  updatedAt: Date;
}
