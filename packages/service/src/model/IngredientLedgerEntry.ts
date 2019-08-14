import { BatchIngredientUse } from './BatchIngredientUse';
import { InventoryItem } from './InventoryItem';
import { User } from './User';
import { BaseModel } from './Base';

export enum ENTRY_TYPE {
  Use = 'USE',
  Purchase = 'PURCHASE',
}

export class IngredientLedgerEntry extends BaseModel {
  static get tableName() {
    return 'ingredientLedgerEntry';
  }

  inventoryIngredient: InventoryItem;

  use: BatchIngredientUse;

  microlitres: number;

  cost: number;
  createdBy: User;
}
