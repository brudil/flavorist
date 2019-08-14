import { RecipeRevision } from './RecipeRevision';
import { Namespace } from './Namespace';
import { User } from './User';
import { BaseModel } from './Base';

enum RecipeVisibility {
  Public = 'PUBLIC',
  Secret = 'SECRET',
  Private = 'PRIVATE',
}

export class Recipe extends BaseModel {
  static get tableName() {
    return 'recipe';
  }

  namespace: Namespace;

  createdBy: User;

  totalRevisions: number;

  revisions: RecipeRevision[];

  remixOf: Recipe;

  remixes: Recipe[];

  secretAccess: string;

  visibility: RecipeVisibility;

  createdAt: Date;

  updatedAt: Date;

  publicDiscussion: number;
}
