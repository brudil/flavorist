import { Ingredient, IngredientType } from '../model/Ingredient';
import { Vendor } from '../model/Vendor';

export async function createFlavor(name: string, vendor: Vendor) {
  await Ingredient.query().insert({
    name,
    vendorId: vendor.id,
    type: IngredientType.Flavor,
  });
}
