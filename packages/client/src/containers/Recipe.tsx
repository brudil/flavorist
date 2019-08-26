import React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import {
  GetRecipeByNamespaceAndSlugQuery,
  GetRecipeByNamespaceAndSlugQueryVariables,
  RecipeRevision,
} from '../generated/graphql';
import { getRecipeByNamespaceAndSlug } from '../graphql/queries/recipe/getRecipeByNamespaceAndSlug';
import ReactMarkdown from 'react-markdown';
import { RecipeIngredientTable } from '../components/RecipeIngredientTable';
import { RecipeSidebar } from '../components/RecipeSidebar';

export const Recipe: React.FC<
  RouteComponentProps<{ namespaceName: string; recipeSlug: string }>
> = ({ namespaceName = '', recipeSlug = '' }) => {
  const { data, loading } = useQuery<
    GetRecipeByNamespaceAndSlugQuery,
    GetRecipeByNamespaceAndSlugQueryVariables
  >(getRecipeByNamespaceAndSlug, { variables: { recipeSlug, namespaceName } });

  const recipe = data && data.recipeByNamespaceAndSlug;

  if (!data || loading || !recipe || !recipe.latestRevision) {
    return null;
  }

  return (
    <div css={{ borderTop: '7px solid #DF9E19', padding: '1rem' }}>
      <div css={{ display: 'flex' }}>
        <div
          css={{
            maxWidth: '220px',
            width: '30%',
            paddingRight: '1rem',
            boxSizing: 'border-box',
          }}
        >
          <img
            css={{ width: '100%', display: 'block' }}
            src="https://placeimg.com/512/512/animals"
            alt=""
          />
        </div>
        <div css={{ flex: '1 1 0' }}>
          <h1 css={{ margin: 0 }}>{recipe.name}</h1>
          <div>
            <Link to={`/${recipe.namespace!.name}`}>
              {recipe.namespace!.name}
            </Link>
          </div>
          <div>
            <ReactMarkdown source={recipe.latestRevision.description || ''} />
          </div>
        </div>
      </div>
      <div css={{ display: 'flex' }}>
        <aside
          css={{
            maxWidth: '220px',
            width: '30%',
            paddingRight: '1rem',
            boxSizing: 'border-box',
          }}
        >
          <RecipeSidebar
            recipeRevision={recipe.latestRevision as RecipeRevision}
          />
        </aside>
        <div css={{ flex: '1 1 0' }}>
          <RecipeIngredientTable
            recipeRevision={recipe.latestRevision as RecipeRevision}
          />
        </div>
      </div>
      <div>
        <h2>Reviews + Discussion</h2>
      </div>
    </div>
  );
};
