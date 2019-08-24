import { createEntityLoaderFactory } from './utils';
import {
  getRecipeById,
  getRecipeBySlugAndNamespaceName,
  getRecipeRevisionById,
} from '../db/recipe';
import { Recipe } from '../model/Recipe';
import { ID } from '../model/Base';
import { RecipeRevision } from '../model/RecipeRevision';

export const createRecipeLoaders = () => {
  const createRecipeLoader = createEntityLoaderFactory<Recipe>();

  return {
    recipeById: createRecipeLoader<ID>(getRecipeById, (recipe) => recipe.id),
    recipeBySlugAndNamespaceName: createRecipeLoader<{
      namespaceName: string;
      recipeSlug: string;
    }>(getRecipeBySlugAndNamespaceName, (recipe) => ({
      namespaceName: recipe.namespace.name,
      recipeSlug: recipe.slug,
    })),
  };
};

export const createRecipeRevisionLoaders = () => {
  const createRecipeRevisionLoader = createEntityLoaderFactory<
    RecipeRevision
  >();

  return {
    recipeRevisionById: createRecipeRevisionLoader<ID>(
      getRecipeRevisionById,
      (recipeRevision) => recipeRevision.id,
    ),
  };
};
