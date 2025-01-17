import { Resolvers } from '../../generated/graphql';
import { Recipe } from '../../model/Recipe';

export const recipeMutation: Resolvers = {
  Mutation: {
    async createRecipe(_parent, { recipe }, viewer) {
      try {
        const recipeModel = await Recipe.query().insertGraph({
          namespaceId: viewer.auth.namespace.id,
          createdById: viewer.auth.id,
          name: recipe.name,
          revisions: [
            {
              revisionNumber: 1,
              suggestedSteepHours: recipe.suggestedSteepHours,
              suggestedVg: recipe.suggestedVg,
              shakeAndVapable: recipe.shakeAndVapable,
              createdById: viewer.auth.id,
              ingredients: recipe.ingredients.map((ingredientUse) => ({
                ingredientId: ingredientUse!.ingredientId,
                percentage: ingredientUse!.percentage,
              })),
            },
          ],
        });

        await Recipe.query()
          .where({ id: recipeModel.id })
          .update({ latestRevisionId: recipeModel.revisions[0].id });

        return {
          success: true,
        };
      } catch (e) {
        console.error(e);
        throw new Error('failed to recipe user');
      }
    },
  },
};
