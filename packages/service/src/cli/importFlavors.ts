import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();
import { promises as fs } from 'fs';
import path from 'path';
import '../db';
import { getOrCreateVendor } from '../db/vendor';
import { createFlavor } from '../db/ingredient';
import memo from 'fast-memoize';
import { knex } from '../db';

(async () => {
  // @ts-ignore
  const getOrCreateVendorMemo = memo(getOrCreateVendor);

  const file = await fs.readFile(
    path.resolve(process.cwd(), '../infuser/flavors.generated.json'),
    { encoding: 'utf-8' },
  );

  const data: any[] = JSON.parse(file);

  for (const flavor of data) {
    console.log(flavor);

    const vendor = await getOrCreateVendorMemo(flavor.vendor, flavor.vendor);
    await createFlavor(flavor.name, vendor);
  }

  await knex.destroy();
})();
