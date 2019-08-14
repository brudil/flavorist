import { userLoader } from './user';
import { vendorLoader } from './vendor';

export const createLoaders = () => ({
  user: userLoader(),
  vendor: vendorLoader(),
});
