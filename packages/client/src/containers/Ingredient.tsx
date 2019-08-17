import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Helmet from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';
import { getIngredient } from '../graphql/queries/ingredients/getIngredient';
import { GetIngredientQuery } from '../generated/graphql';

export const Ingredient: React.FC<RouteComponentProps<{ id: string }>> = ({
  id,
}) => {
  const { data, error, loading } = useQuery<GetIngredientQuery>(getIngredient, {
    variables: { id },
  });

  return (
    <div>
      <Helmet title="404" />
      <h1>Ingredients</h1>
      {(!loading || error) && data && data.ingredient ? (
        <h1>{data.ingredient.name}</h1>
      ) : null}
    </div>
  );
};
