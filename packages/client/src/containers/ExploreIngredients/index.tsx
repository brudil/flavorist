import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Helmet from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';
import EXPLORE_INGREDIENTS_QUERY from './ExploreIngredients.graphql';
import { ExploreIngredientsQuery } from '../../generated/graphql';

export const ExploreIngredients: React.FC<RouteComponentProps> = () => {
  const { data, error, loading, fetchMore } = useQuery<ExploreIngredientsQuery>(
    EXPLORE_INGREDIENTS_QUERY,
  );

  return (
    <div>
      <Helmet title="404" />
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
                    {ingredient.node.vendor && ingredient.node.vendor.shortName}{' '}
                    {ingredient.node.name}
                  </li>
                ),
            )
          : null}
      </ul>

      <button
        onClick={() =>
          fetchMore({
            variables: {
              cursor:
                data &&
                data.allIngredients &&
                data.allIngredients.pageInfo.endCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) return previousResult;

              const newEdges = fetchMoreResult.allIngredients.edges;
              const pageInfo = fetchMoreResult.allIngredients.pageInfo;

              return newEdges.length
                ? {
                    // Put the new comments at the end of the list and update `pageInfo`
                    // so we have the new `endCursor` and `hasNextPage` values
                    allIngredients: {
                      __typename: previousResult.allIngredients.__typename,
                      edges: [
                        ...previousResult.allIngredients.edges,
                        ...newEdges,
                      ],
                      pageInfo,
                    },
                  }
                : previousResult;
            },
          })
        }
      >
        Load more
      </button>
    </div>
  );
};
