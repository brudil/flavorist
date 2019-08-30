import React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { getViewerRecipes } from '../graphql/queries/viewer/getViewerRecipes';
import { GetViewerRecipesQuery } from '../generated/graphql';
import { ViewContainer } from '../components/ViewContainer';

export const RecipesLibrary: React.FC<RouteComponentProps> = () => {
  const { data, loading } = useQuery<GetViewerRecipesQuery>(getViewerRecipes);

  const recipes = (data && data.viewer && data.viewer.recipes) || [];

  return (
    <ViewContainer>
      <h1>Recipes</h1>

      {!loading
        ? recipes.map((recipe: any) => (
            <li>
              <Link to={`/${recipe.namespace.name}/${recipe.slug}`}>
                {recipe.name}
              </Link>
            </li>
          ))
        : null}
    </ViewContainer>
  );
};
