import { Batch } from '../../model/Batch';
import { ApolloError } from 'apollo-server-core';
import { Resolvers } from '../../generated/graphql';

export const batchQuery: Resolvers = {
  Query: {
    batch: async (_parent, { batchId }) => {
      const batch = await Batch.query().findOne(batchId);

      if (!batch) {
        throw new ApolloError('batch missing');
      }

      return batch;
    },
  },
  Batch: {
    id(batch) {
      return batch.id.toString();
    },
    user(batch: Batch, _: any, _ctx) {
      return batch.user || null;
    },
  },
};
