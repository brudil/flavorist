import { getRepository } from 'typeorm';
import { Batch } from '../../entity/Batch';
import { ApolloError } from 'apollo-server-core';
import { Resolvers } from '../../generated/graphql';

export const batchQuery: Resolvers = {
  Query: {
    batch: async (_parent, { batchId }, context) => {
      console.log(context);

      const batch = await getRepository(Batch).findOne(batchId, {
        relations: ['user'],
      });
      console.log(batch);
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
