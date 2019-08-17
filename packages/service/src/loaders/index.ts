import { userLoader } from './user';
import { vendorLoader } from './vendor';
import { ingredientLoader } from './ingredient';

export const createLoaders = () => ({
  user: userLoader(),
  vendor: vendorLoader(),
  ingredient: ingredientLoader(),
});
