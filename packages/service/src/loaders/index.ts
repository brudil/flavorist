import { userLoader } from './user';
import { vendorLoader } from './vendor';
import { ingredientLoader } from './ingredient';
import { recipeLoader, recipeRevisionLoader } from './recipe';
import { namespaceLoader } from './namespace';

export const createLoaders = () => ({
  user: userLoader(),
  vendor: vendorLoader(),
  ingredient: ingredientLoader(),
  recipeRevision: recipeRevisionLoader(),
  recipe: recipeLoader(),
  namespace: namespaceLoader(),
});
