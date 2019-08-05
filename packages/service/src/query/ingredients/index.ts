import { Resolvers } from '../../generated/graphql';
import { getRepository } from 'typeorm';
import { Flavor } from '../../entity/Flavor';

export const ingredientQuery: Resolvers = {
  Query: {
    allIngredients: async (_parent) => {
      const flavorRepo = getRepository(Flavor);

      return await flavorRepo.find({ relations: ['vendor'], take: 100 });
    },
  },
  Flavor: {},
};
