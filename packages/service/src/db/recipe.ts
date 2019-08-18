import { ID } from '../model/Base';
import { RecipeRevision } from '../model/RecipeRevision';
import { Recipe } from '../model/Recipe';

export async function getRecipeRevisionById(ids: ID[]) {
  return RecipeRevision.query().whereIn('id', ids);
}

export async function getRecipeById(ids: ID[]) {
  return Recipe.query().whereIn('id', ids);
}
