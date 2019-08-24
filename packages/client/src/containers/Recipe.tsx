import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { getRecipe } from '../graphql/queries/recipe/getRecipe';
import { GetRecipeQuery, GetRecipeQueryVariables } from '../generated/graphql';

export const Recipe: React.FC<RouteComponentProps<{ recipeId: string }>> = ({
  recipeId,
}) => {
  const { data, loading } = useQuery<GetRecipeQuery, GetRecipeQueryVariables>(
    getRecipe,
    { variables: { recipeId: recipeId || '' } },
  );

  if (!data || loading) {
    return null;
  }

  return (
    <div>
      <h1>Recipe: {recipeId}</h1>

      <h2>{data.recipe!.name}</h2>

      <table>
        <tbody>
          {data.recipe!.latestRevision!.ingredients!.map((ingredientUse) => (
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
