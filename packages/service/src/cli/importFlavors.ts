import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config();
import { promises as fs } from 'fs';
import * as path from 'path';
import { setupDb } from '../db';
import { getOrCreateVendor } from '../db/vendor';
import { createIngredient } from '../db/ingredient';
import * as memo from 'fast-memoize';

(async () => {
  const connection = await setupDb();

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
    await createIngredient(flavor.name, vendor);
  }

  await connection.close();
})();
