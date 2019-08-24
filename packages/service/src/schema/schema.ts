import { makeExecutableSchema } from 'graphql-tools';
import { UserSchema } from './User';
import { IngredientSchema } from './Ingredient';
import { RecipeSchema } from './Recipe';
import { DiscussionSchema } from './Discussion';
import { BatchSchema } from './Batch';
import { merge } from 'lodash';
import { CoreSchema } from './Core';
import { batchQuery } from '../query/batch';
import { userMutation } from '../mutation/user';
import { ReviewSchema } from './Review';
import { userQuery } from '../query/user';
import { nodeInterface } from '../query/interfaces/Node';
import { ingredientQuery } from '../query/ingredients';
import { TeamSchema } from './Team';
import { NamespaceSchema } from './Namespace';
import { namespaceQuery } from '../query/namespace';
import { teamQuery } from '../query/team';
import { recipeMutation } from '../mutation/recipe';
import { recipeQuery } from '../query/recipe';
import { ingredientMutation } from '../mutation/ingredient';

const resolvers = merge(
  {},
  // Interfaces!
  nodeInterface,

  // Queries!
  batchQuery,
  userQuery,
  ingredientQuery,
  namespaceQuery,
  teamQuery,
  recipeQuery,

  // Mutations!
  userMutation,
  recipeMutation,
  ingredientMutation,
);

export const schema = makeExecutableSchema({
  typeDefs: [
    CoreSchema,
    RecipeSchema,
    UserSchema,
    TeamSchema,
    NamespaceSchema,
    IngredientSchema,
    ReviewSchema,
    DiscussionSchema,
    BatchSchema,
  ],
  resolvers: resolvers as any,
  inheritResolversFromInterfaces: true,
});
