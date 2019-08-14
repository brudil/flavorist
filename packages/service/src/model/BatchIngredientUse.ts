import { Ingredient } from './Ingredient';
import { IngredientLedgerEntry } from './IngredientLedgerEntry';
import { BaseModel } from './Base';
import { Batch } from './Batch';

export class BatchIngredientUse extends BaseModel {
  static get tableName() {
    return 'batchIngredientUse';
  }

  ingredient: Ingredient;

  batch: Batch;

  ledgerEntry: IngredientLedgerEntry;

  percentage: number;
}
