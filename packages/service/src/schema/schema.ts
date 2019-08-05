import { makeExecutableSchema } from 'graphql-tools';
import { UserSchema } from './User';
import { FlavorSchema } from './Flavor';
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

const resolvers = merge(
  {},
  // Interfaces!
  nodeInterface,

  // Queries!
  batchQuery,
  userQuery,
  ingredientQuery,

  // Mutations!
  userMutation,
);

export const schema = makeExecutableSchema({
  typeDefs: [
    CoreSchema,
    RecipeSchema,
    UserSchema,
    FlavorSchema,
    ReviewSchema,
    DiscussionSchema,
    BatchSchema,
  ],
  resolvers: resolvers as any,
  inheritResolversFromInterfaces: true,
});
