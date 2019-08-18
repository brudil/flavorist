import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Helmet } from 'react-helmet-async';
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
      <h1>Ingredients</h1>
      {(!loading || error) && data && data.ingredient ? (
        <div>
          <Helmet title={data.ingredient.name || ''} />
          <h1>{data.ingredient.name}</h1>
        </div>
      ) : null}
    </div>
  );
};
