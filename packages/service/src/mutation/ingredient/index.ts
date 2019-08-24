import { Resolvers } from '../../generated/graphql';
// import { Recipe } from '../../model/Recipe';
// import {IngredientLedgerEntry} from "../../model/IngredientLedgerEntry";

export const ingredientMutation: Resolvers = {
  Mutation: {
    // async createIngredientLedgerEntry(_parent, { entry }, viewer) {
    //   try {
    //     const recipeModel = await IngredientLedgerEntry.query().insert();
    //
    //     await Recipe.query()
    //       .where({ id: recipeModel.id })
    //       .update({ latestRevisionId: recipeModel.revisions[0].id });
    //
    //     return {
    //       success: true,
    //     };
    //   } catch (e) {
    //     console.error(e);
    //     throw new Error('failed to recipe user');
    //   }
    // },
  },
};
