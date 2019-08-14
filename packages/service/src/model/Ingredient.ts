import { Discussion } from './Discussion';
import { Vendor } from './Vendor';
import { InventoryItem } from './InventoryItem';
import { RecipeIngredientUse } from './RecipeIngredientUse';
import { BatchIngredientUse } from './BatchIngredientUse';
import { BaseModel, ID } from './Base';

export enum IngredientType {
  Flavor = 1,
  Base = 2,
}

export class Ingredient extends BaseModel {
  static get tableName() {
    return 'ingredient';
  }

  publicDiscussion: Discussion;

  vendorId: ID;
  vendor: Vendor;

  inventories: InventoryItem[];

  name: string;

  type: IngredientType;

  ingredientUse: RecipeIngredientUse[];

  batchUse: BatchIngredientUse[];

  createdAt: Date;

  updatedAt: Date;
}
