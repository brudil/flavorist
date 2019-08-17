import { createLoader } from './utils';
import { getIngredientsById } from '../db/ingredient';

export const ingredientLoader = createLoader({
  id: getIngredientsById,
});
