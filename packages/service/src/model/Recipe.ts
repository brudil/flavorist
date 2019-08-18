import { RecipeRevision } from './RecipeRevision';
import { Namespace } from './Namespace';
import { User } from './User';
import { BaseModel, ID } from './Base';
import { Model } from 'objection';

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
  namespaceId: ID;

  createdBy: User;
  createdById: ID;

  totalRevisions: number;

  revisions: RecipeRevision[];
  latestRevision: RecipeRevision;
  latestRevisionId: ID;

  remixOf: Recipe;

  remixes: Recipe[];

  secretAccess: string;

  visibility: RecipeVisibility;

  createdAt: string;

  updatedAt: string;

  publicDiscussion: number;

  static get relationMappings() {
    return {
      namespace: {
        relation: Model.HasOneRelation,
        modelClass: Namespace,
        join: {
          from: 'recipe.namespaceId',
          to: 'namespace.id',
        },
      },
      revisions: {
        relation: Model.HasManyRelation,
        modelClass: RecipeRevision,
        join: {
          from: 'recipe.id',
          to: 'recipeRevision.recipeId',
        },
      },
    };
  }
}
