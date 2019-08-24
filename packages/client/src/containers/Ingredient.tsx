import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { getIngredientBySlugAndShortName } from '../graphql/queries/ingredients/getIngredientBySlugAndShortName';
import {
  GetIngredientBySlugAndShortNameQuery,
  GetIngredientBySlugAndShortNameQueryVariables,
} from '../generated/graphql';

export const Ingredient: React.FC<
  RouteComponentProps<{ slug: string; vendorShortName: string }>
> = ({ slug, vendorShortName }) => {
  const { data, error, loading } = useQuery<
    GetIngredientBySlugAndShortNameQuery,
    GetIngredientBySlugAndShortNameQueryVariables
  >(getIngredientBySlugAndShortName, {
    variables: { vendorShortName: vendorShortName || '', slug: slug || '' },
  });

  const ingredient = data && data.ingredientBySlugAndShortName;

  return (
    <div>
      <h1>Ingredients</h1>
      {(!loading || error) && ingredient ? (
        <div>
          <Helmet title={ingredient.name || ''} />
          <h1>{ingredient.name}</h1>
        </div>
      ) : null}
    </div>
  );
};
