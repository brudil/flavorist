import { Ingredient, IngredientType } from '../model/Ingredient';
import { Vendor } from '../model/Vendor';
import { Context } from '../types/context';
import { ID } from '../model/Base';

export async function createFlavor(name: string, vendor: Vendor) {
  await Ingredient.query().insert({
    name,
    vendorId: vendor.id,
    type: IngredientType.Flavor,
  });
}

export async function genIngredient(viewer: Context, id: ID) {
  // if ingredient !public && canViewNamespace(user, ingredient.owner)
  return await viewer.loaders.ingredient.id.load(id);
}

export async function getIngredientsById(ids: ID[]) {
  return Ingredient.query().whereIn('id', ids);
}
