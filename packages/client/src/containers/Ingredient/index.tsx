import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Helmet from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';
import { getIngredient } from '../../graphql/queries/ingredients/getIngredient';
import { GetIngredientQuery } from '../../generated/graphql';

export const Ingredient: React.FC<RouteComponentProps> = () => {
  const { data, error, loading } = useQuery<GetIngredientQuery>(getIngredient);

  return (
    <div>
      <Helmet title="404" />
      <h1>Ingredients</h1>

      <ul>
        {(!loading || error) && data && data.ingredient ? <h1>Hey</h1> : null}
      </ul>
    </div>
  );
};
