import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import {
  GetRecipeByNamespaceAndSlugQuery,
  GetRecipeByNamespaceAndSlugQueryVariables,
} from '../generated/graphql';
import { getRecipeByNamespaceAndSlug } from '../graphql/queries/recipe/getRecipeByNamespaceAndSlug';

export const Recipe: React.FC<
  RouteComponentProps<{ namespaceName: string; recipeSlug: string }>
> = ({ namespaceName = '', recipeSlug = '' }) => {
  const { data, loading } = useQuery<
    GetRecipeByNamespaceAndSlugQuery,
    GetRecipeByNamespaceAndSlugQueryVariables
  >(getRecipeByNamespaceAndSlug, { variables: { recipeSlug, namespaceName } });

  if (!data || loading || !data.recipeByNamespaceAndSlug) {
    return null;
  }

  const recipe = data.recipeByNamespaceAndSlug;

  return (
    <div>
      <h1>Recipe</h1>

      <h2>{recipe.name}</h2>

      <table>
        <tbody>
          {recipe.latestRevision!.ingredients!.map((ingredientUse) => (
            <tr>
              <td>{ingredientUse!.ingredient!.vendor!.shortName}</td>
              <td>{ingredientUse!.ingredient!.name}</td>
              <td>{ingredientUse!.percentage! / 1000}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
