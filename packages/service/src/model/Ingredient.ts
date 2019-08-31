import { Discussion } from './Discussion';
import { Vendor } from './Vendor';
import { InventoryItem } from './InventoryItem';
import { RecipeIngredientUse } from './RecipeIngredientUse';
import { BatchIngredientUse } from './BatchIngredientUse';
import { BaseModel, ID } from './Base';
import { Model } from 'objection';
import { SlugPlugin } from '../libs/model/slug';
import {
  createFilter,
  createSortFilter,
  SortConfig,
} from '../libs/createFilter';

export enum IngredientType {
  Flavor = 1,
  Base = 2,
}

@SlugPlugin({
  slugField: 'slug',
  sourceField: 'name',
  unique: ['vendorId'],
  slugCandidates: async () => [['name'], ['name', 'id']],
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

export const createIngredientFilter = createFilter<
  Ingredient,
  { vendor?: string; personal?: boolean; sort: SortConfig<'name' | 'date'> }
>({
  vendor(scope, vendor) {
    return scope.where('vendor.shortName', '=', vendor);
  },
  personal(scope, flag) {
    return scope.where('public', '=', flag);
  },
  sort: createSortFilter<Ingredient>(),
});
