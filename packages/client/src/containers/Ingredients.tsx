import React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { getIngredients } from '../graphql/queries/ingredients/getIngredients';
import { GetIngredientsQuery } from '../generated/graphql';
import { paginationFetchMore } from '../libs/simplePagninationUpdateQuery';

export const Ingredients: React.FC<RouteComponentProps> = () => {
  const { data, error, loading, fetchMore } = useQuery<GetIngredientsQuery>(
    getIngredients,
  );

  return (
    <div>
      <Helmet title="Ingredients" />
      <h1>Explore Ingredients</h1>

      <ul>
        {(!loading || error) &&
        data &&
        data.allIngredients &&
        data.allIngredients.edges
          ? data.allIngredients.edges.map(
              (ingredient) =>
                ingredient &&
                ingredient.node && (
                  <li key={ingredient.node.id}>
                    <Link
                      to={`/ingredients/${ingredient.node.vendor &&
                        ingredient.node.vendor.shortName}/${
                        ingredient.node.slug
                      }`}
                    >
                      {ingredient.node.vendor &&
                        ingredient.node.vendor.shortName}{' '}
                      {ingredient.node.name}
                    </Link>
                  </li>
                ),
            )
          : null}
      </ul>

      <button
        onClick={() =>
          fetchMore(
            paginationFetchMore(
              'allIngredients',
              data && data.allIngredients.pageInfo.endCursor,
            ),
          )
        }
      >
        Load more
      </button>
    </div>
  );
};
