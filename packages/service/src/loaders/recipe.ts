import { createLoader } from './utils';
import { getRecipeById, getRecipeRevisionById } from '../db/recipe';

export const recipeLoader = createLoader({
  id: getRecipeById,
});

export const recipeRevisionLoader = createLoader({
  id: getRecipeRevisionById,
});
