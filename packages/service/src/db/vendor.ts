import { Vendor } from '../model/Vendor';
import { ID } from '../model/Base';

export async function getOrCreateVendor(name: string, shortName: string) {
  let vendor = await Vendor.query().findOne({ shortName });

  if (!vendor) {
    return await Vendor.query().insert({ name, shortName });
  }

  return vendor;
}

export async function getVendorsById(ids: ID[]) {
  return Vendor.query().whereIn('id', ids);
}
