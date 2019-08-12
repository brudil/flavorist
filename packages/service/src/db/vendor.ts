import { Vendor } from '../entity/Vendor';
import { getConnection } from 'typeorm';

export async function getOrCreateVendor(name: string, shortName: string) {
  const connection = getConnection();
  const vendorRepo = connection.getRepository(Vendor);

  let vendor = await vendorRepo.findOne({ shortName });
  if (!vendor) {
    vendor = new Vendor();
    vendor.name = name;
    vendor.shortName = shortName;

    return await vendorRepo.save(vendor);
  }

  return vendor;
}
