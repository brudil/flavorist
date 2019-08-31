import React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { getIngredients } from '../graphql/queries/ingredients/getIngredients';
import { GetIngredientsQuery } from '../generated/graphql';
import { paginationFetchMore } from '../libs/simplePagninationUpdateQuery';
import {
  IngredientInventoryStatus,
  IngredientTable,
  IngredientTableCell,
  IngredientTableIndicator,
  IngredientTableRow,
} from '../components/IngredientTable';
import { ViewContainer } from '../components/ViewContainer';

export const Ingredients: React.FC<RouteComponentProps> = () => {
  const { data, error, loading, fetchMore } = useQuery<GetIngredientsQuery>(
    getIngredients,
  );

  return (
    <ViewContainer>
      <Helmet title="Ingredients" />
      <h1>Explore Ingredients</h1>

      <IngredientTable>
        <thead>
          <IngredientTableIndicator
            ingredientStatus={IngredientInventoryStatus.Header}
          />
          <td>Vendor</td>
          <td>Name</td>
          <td>Average used</td>
        </thead>
        <tbody>
          {(!loading || error) &&
          data &&
          data.allIngredients &&
          data.allIngredients.edges
            ? data.allIngredients.edges.map(
                (ingredient) =>
                  ingredient &&
                  ingredient.node && (
                    <IngredientTableRow key={ingredient.node.id}>
                      <IngredientTableIndicator
                        ingredientStatus={IngredientInventoryStatus.Absent}
                      />
                      <IngredientTableCell css={{ '& a': { color: '#888' } }}>
                        <Link
                          to={`/vendor/${ingredient.node.vendor &&
                            ingredient.node.vendor.shortName}`}
                        >
                          {ingredient.node.vendor &&
                            ingredient.node.vendor.shortName}
                        </Link>
                      </IngredientTableCell>
                      <IngredientTableCell>
                        <Link
                          to={`/ingredients/${ingredient.node.vendor &&
                            ingredient.node.vendor.shortName}/${
                            ingredient.node.slug
                          }`}
                        >
                          {ingredient.node.name}
                        </Link>
                      </IngredientTableCell>
                      <IngredientTableCell>tbi</IngredientTableCell>
                    </IngredientTableRow>
                  ),
              )
            : null}
        </tbody>
      </IngredientTable>

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
    </ViewContainer>
  );
};
