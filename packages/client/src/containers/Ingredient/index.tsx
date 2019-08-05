import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Helmet from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';
import INGREDIENT_QUERY from './Ingredient.graphql';
import { ExploreIngredientsQuery } from '../../generated/graphql';

export const Ingredient: React.FC<RouteComponentProps> = () => {
  const { data, error, loading } = useQuery<ExploreIngredientsQuery>(
    INGREDIENT_QUERY,
  );

  return (
    <div>
      <Helmet title="404" />
      <h1>Ingredients</h1>

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
