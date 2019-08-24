import { createUserLoaders } from './user';
import { createVendorLoaders } from './vendor';
import { createIngredientLoaders } from './ingredient';
import { createRecipeLoaders, createRecipeRevisionLoaders } from './recipe';
import { createNamespaceLoaders } from './namespace';

export const createLoaders = () => ({
  ...createRecipeLoaders(),
  ...createRecipeRevisionLoaders(),
  ...createUserLoaders(),
  ...createVendorLoaders(),
  ...createIngredientLoaders(),
  ...createVendorLoaders(),
  ...createNamespaceLoaders(),
});
