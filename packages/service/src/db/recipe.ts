import { ID } from '../model/Base';
import { RecipeRevision } from '../model/RecipeRevision';
import { Recipe } from '../model/Recipe';

export async function getRecipeRevisionById(ids: ID[]) {
  return RecipeRevision.query().whereIn('id', ids);
}

export async function getRecipeById(ids: ID[]) {
  return Recipe.query().whereIn('id', ids);
}

export async function getRecipeBySlugAndNamespaceName(
  finders: { recipeSlug: string; namespaceName: string }[],
) {
  return Recipe.query()
    .eager('namespace')
    .joinRelation('namespace')
    .whereInComposite(
      ['slug', 'namespace.name'],
      finders.map(({ recipeSlug, namespaceName }) => [
        recipeSlug,
        namespaceName,
      ]),
    )
    .castTo(Recipe);
}
