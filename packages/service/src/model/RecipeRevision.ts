import { Batch } from './Batch';
import { Recipe } from './Recipe';
import { RecipeIngredientUse } from './RecipeIngredientUse';
import { User } from './User';
import { BaseModel } from './Base';
import { IsDecimal, IsInt, IsString, Max, Min } from 'class-validator';

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

  recipe: Recipe;

  ingredients: RecipeIngredientUse[];

  batches: Batch[];

  createdAt: Date;

  updatedAt: Date;

  createdBy: User;
}
