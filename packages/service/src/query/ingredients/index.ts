import { Resolvers } from '../../generated/graphql';
import { Ingredient } from '../../model/Ingredient';
import { createConnection } from '../../libs/createConnection';
import { genIngredient } from '../../db/ingredient';

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
    searchIngredients: async (_parent, { query, cursor, first, last }) => {
      const connection = createConnection({ first, cursor, last });

      const ingredients = await Ingredient.query()
        .where('name', 'ILIKE', `%${query}%`)
        .limit(connection.args().take)
        .offset(connection.args().skip);

      return connection.payload(ingredients);
    },
    ingredient: async (_parent, { id }, viewer) => {
      return await genIngredient(viewer, id);
    },
  },
  Ingredient: {
    vendor: async (ingredient, _args, { loaders }) => {
      return await loaders.vendor.id.load(ingredient.vendorId);
    },
  },
};
