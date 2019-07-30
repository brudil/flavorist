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

const resolvers = merge(
  {},
  // Queries!
  batchQuery,

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
});
