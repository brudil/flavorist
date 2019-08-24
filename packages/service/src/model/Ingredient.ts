import { Discussion } from './Discussion';
import { Vendor } from './Vendor';
import { InventoryItem } from './InventoryItem';
import { RecipeIngredientUse } from './RecipeIngredientUse';
import { BatchIngredientUse } from './BatchIngredientUse';
import { BaseModel, ID } from './Base';
import Slugify from 'objection-slugify';
import { Model } from 'objection';
import { Namespace } from './Namespace';
import { RecipeRevision } from './RecipeRevision';

export enum IngredientType {
  Flavor = 1,
  Base = 2,
}

@Slugify({
  sourceField: 'name',
  slugField: 'slug',
  unique: true,
  update: false,
})
export class Ingredient extends BaseModel {
  static get tableName() {
    return 'ingredient';
  }

  publicDiscussion: Discussion;

  vendorId: ID;
  vendor: Vendor;

  inventories: InventoryItem[];

  name: string;
  slug: string;

  type: IngredientType;

  ingredientUse: RecipeIngredientUse[];

  batchUse: BatchIngredientUse[];

  createdAt: Date;

  updatedAt: Date;

  static get relationMappings() {
    return {
      vendor: {
        relation: Model.HasOneRelation,
        modelClass: Vendor,
        join: {
          from: 'ingredient.vendorId',
          to: 'vendor.id',
        },
      },
    };
  }
}
