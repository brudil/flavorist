import { Resolvers } from '../../generated/graphql';
import { Ingredient } from '../../model/Ingredient';
import { createConnection } from '../../libs/createConnection';

export const ingredientQuery: Resolvers = {
  Query: {
    allIngredients: async (_parent, { cursor, first, last }) => {
      const connection = createConnection({ first, cursor, last });

      const ingredients = await Ingredient.query()
        .orderBy('name')
        .limit(connection.args().take)
        .offset(connection.args().skip);

      return connection.payload(ingredients);
    },
  },
  Ingredient: {
    vendor: async (ingredient, _args, { loaders }) => {
      return await loaders.vendor.id.load(ingredient.vendorId);
    },
  },
};
