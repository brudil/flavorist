import { createEntityLoaderFactory } from './utils';
import { getVendorsById } from '../db/vendor';
import { ID } from '../model/Base';
import { Vendor } from '../model/Vendor';

export const createVendorLoaders = () => {
  const createVendorLoader = createEntityLoaderFactory<Vendor>();

  return {
    vendorById: createVendorLoader<ID>(getVendorsById, (vendor) => vendor.id),
  };
};
