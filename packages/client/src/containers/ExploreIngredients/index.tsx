import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Helmet from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';
import EXPLORE_INGREDIENTS_QUERY from './ExploreIngredients.graphql';
import { ExploreIngredientsQuery } from '../../generated/graphql';

export const ExploreIngredients: React.FC<RouteComponentProps> = () => {
  const { data, error, loading } = useQuery<ExploreIngredientsQuery>(
    EXPLORE_INGREDIENTS_QUERY,
  );

  return (
    <div>
      <Helmet title="404" />
      <h1>Explore Ingredients</h1>

      <ul>
        {(!loading || error) && data && data.allIngredients
          ? data.allIngredients.map(
              (ingredient) =>
                ingredient && (
                  <li>
                    {ingredient.vendor && ingredient.vendor.shortName}{' '}
                    {ingredient.name}
                  </li>
                ),
            )
          : null}
      </ul>
    </div>
  );
};
