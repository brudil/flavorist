import { createLoader } from './utils';
import { getVendorsById } from '../db/vendor';

export const vendorLoader = createLoader({
  id: getVendorsById,
});
