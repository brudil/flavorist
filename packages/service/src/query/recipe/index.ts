import { Resolvers } from '../../generated/graphql';
import { Recipe } from '../../model/Recipe';
import { RecipeIngredientUse } from '../../model/RecipeIngredientUse';
import { Context } from '../../types/context';

export const recipeQuery: Resolvers = {
  Query: {
    recipe: async (_parent, args, viewer) => {
      return await viewer.loaders.recipeById.load(args.recipeId);
    },
    recipeByNamespaceAndSlug: async (
      _parent,
      { namespaceName, recipeSlug },
      viewer,
    ) => {
      return await viewer.loaders.recipeBySlugAndNamespaceName.load({
        namespaceName,
        recipeSlug,
      });
    },
  },
  Recipe: {
    latestRevision: async (entity: Recipe, _, viewer) => {
      const rr = await viewer.loaders.recipeRevisionById.load(
        entity.latestRevisionId,
      );
      console.log('rr', rr);
      return rr;
    },
    namespace: async (entity: Recipe, _, viewer) => {
      return await viewer.loaders.namespaceById.load(entity.namespaceId);
    },
  },
  RecipeRevision: {
    ingredients: async (parent) => {
      return await parent.$relatedQuery('ingredients');
    },
  },
  RecipeIngredientUse: {
    ingredient: async (parent: RecipeIngredientUse, _, viewer: Context) => {
      return await viewer.loaders.ingredientById.load(parent.ingredientId);
    },
  },
};
