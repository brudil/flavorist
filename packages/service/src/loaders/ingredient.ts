import { createEntityLoaderFactory } from './utils';
import { getIngredientsById } from '../db/ingredient';
import { Ingredient } from '../model/Ingredient';
import { ID } from '../model/Base';

export const createIngredientLoaders = () => {
  const createIngredientLoader = createEntityLoaderFactory<Ingredient>();
  return {
    ingredientById: createIngredientLoader<ID>(
      getIngredientsById,
      (ingredient) => ingredient.id,
    ),
  };
};
