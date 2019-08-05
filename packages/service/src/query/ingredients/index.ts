import { Resolvers } from '../../generated/graphql';
import { getRepository } from 'typeorm';
import { Ingredient } from '../../entity/Ingredient';
import { createConnection } from '../../libs/createConnection';

export const ingredientQuery: Resolvers = {
  Query: {
    allIngredients: async (_parent, { cursor, first, last }) => {
      const ingredientRepo = getRepository(Ingredient);

      const connection = createConnection({ first, cursor, last });

      console.log(connection.args());
      const ingredients = await ingredientRepo.find({
        relations: ['vendor'],
        order: { name: 'ASC' },
        ...connection.args(),
      });

      return connection.payload(ingredients);
    },
  },
  Ingredient: {},
};
