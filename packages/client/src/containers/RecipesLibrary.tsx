import React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { getViewerRecipes } from '../graphql/queries/viewer/getViewerRecipes';
import { GetViewerRecipesQuery } from '../generated/graphql';

export const RecipesLibrary: React.FC<RouteComponentProps> = () => {
  const { data, loading } = useQuery<GetViewerRecipesQuery>(getViewerRecipes);

  return (
    <div>
      <h1>Recipes</h1>

      {data && !loading
        ? data.viewer!.recipes!.map((recipe: any) => (
            <li>
              <Link to={`/${recipe.namespace.name}/${recipe.id}`}>
                {recipe.latestRevision.name}
              </Link>
            </li>
          ))
        : null}
    </div>
  );
};
