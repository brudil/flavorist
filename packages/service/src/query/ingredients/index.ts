import { Resolvers } from '../../generated/graphql';
import { getRepository } from 'typeorm';
import { Ingredient } from '../../entity/Ingredient';

export const ingredientQuery: Resolvers = {
  Query: {
    allIngredients: async (_parent) => {
      const ingredientRepo = getRepository(Ingredient);

      return await ingredientRepo.find({ relations: ['vendor'], take: 100 });
    },
  },
  Ingredient: {},
};
