import { Ingredient } from './Ingredient';
import { IngredientLedgerEntry } from './IngredientLedgerEntry';
import { Namespace } from './Namespace';
import { BaseModel } from './Base';

export class InventoryItem extends BaseModel {
  static get tableName() {
    return 'inventoryItem';
  }

  name: string;

  ingredient: Ingredient;

  namespace: Namespace;

  createdAt: Date;

  updatedAt: Date;

  currentLevelMicrolitres: number;

  currentLevelCost: number;

  ledgerEntries: IngredientLedgerEntry[];

  privateDiscussion: number;
}
