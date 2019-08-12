import { createConnection } from 'typeorm';
import { Batch } from './entity/Batch';
import { Discussion, DiscussionComment } from './entity/Discussion';
import { Ingredient } from './entity/Ingredient';
import { RecipeIngredientUse } from './entity/RecipeIngredientUse';
import { InventoryItem } from './entity/InventoryItem';
import { Recipe } from './entity/Recipe';
import { RecipeRevision } from './entity/RecipeRevision';
import { User } from './entity/User';
import { Vendor } from './entity/Vendor';
import { UserEmailAddress } from './entity/UserEmailAddress';
import { BatchIngredientUse } from './entity/BatchIngredientUse';
import { IngredientLedgerEntry } from './entity/IngredientLedgerEntry';
import { Team } from './entity/Team';
import { Namespace } from './entity/Namespace';
import { TeamMembership } from './entity/TeamMembership';
import { Follower } from './entity/Follower';

export async function setupDb() {
  return await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [
      Batch,
      BatchIngredientUse,
      Discussion,
      DiscussionComment,
      Follower,
      Ingredient,
      IngredientLedgerEntry,
      InventoryItem,
      Namespace,
      Recipe,
      RecipeIngredientUse,
      RecipeRevision,
      Team,
      TeamMembership,
      User,
      UserEmailAddress,
      Vendor,
    ],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
  });
}
