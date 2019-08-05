import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config();
import { promises as fs } from 'fs';
import * as path from 'path';
import { setupDb } from '../db';
import { getRepository } from 'typeorm';
import { Ingredient } from '../entity/Ingredient';
import { Vendor } from '../entity/Vendor';

(async () => {
  const connection = await setupDb();

  const ingredientRepo = getRepository(Ingredient);
  const vendorRepo = getRepository(Vendor);

  const file = await fs.readFile(
    path.resolve(process.cwd(), '../infuser/flavors.generated.json'),
    { encoding: 'utf-8' },
  );

  const data: any[] = JSON.parse(file);

  for (const flavor of data) {
    console.log(flavor);

    let vendor = await vendorRepo.findOne({ shortName: flavor.vendor });
    if (!vendor) {
      vendor = new Vendor();
      vendor.name = flavor.vendor;
      vendor.shortName = flavor.vendor;

      await vendorRepo.save(vendor);
    }

    const flavorEntity = new Ingredient();
    flavorEntity.name = flavor.name;
    flavorEntity.vendor = vendor;

    await ingredientRepo.save(flavorEntity);
  }

  await connection.close();
})();
