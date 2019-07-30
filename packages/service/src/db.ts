import { createConnection } from 'typeorm';
import { Batch } from './entity/Batch';
import { Discussion, DiscussionComment } from './entity/Discussion';
import { Flavor } from './entity/Flavor';
import { FlavorUse } from './entity/FlavorUse';
import { InventoryItem } from './entity/InventoryItem';
import { Recipe } from './entity/Recipe';
import { RecipeRevision } from './entity/RecipeRevision';
import { User } from './entity/User';
import { Vendor } from './entity/Vendor';
import { UserEmailAddress } from './entity/UserEmailAddress';

export async function setupDb() {
  return await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [
      Batch,
      Discussion,
      DiscussionComment,
      Flavor,
      FlavorUse,
      InventoryItem,
      Recipe,
      RecipeRevision,
      UserEmailAddress,
      User,
      Vendor,
    ],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
  });
}
