import React, { useState } from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import {
  GetRecipeByNamespaceAndSlugQuery,
  GetRecipeByNamespaceAndSlugQueryVariables,
} from '../generated/graphql';
import { getRecipeByNamespaceAndSlug } from '../graphql/queries/recipe/getRecipeByNamespaceAndSlug';
import ReactMarkdown from 'react-markdown';

export const Recipe: React.FC<
  RouteComponentProps<{ namespaceName: string; recipeSlug: string }>
> = ({ namespaceName = '', recipeSlug = '' }) => {
  const { data, loading } = useQuery<
    GetRecipeByNamespaceAndSlugQuery,
    GetRecipeByNamespaceAndSlugQueryVariables
  >(getRecipeByNamespaceAndSlug, { variables: { recipeSlug, namespaceName } });

  const [showNotes, setShowNotes] = useState(false);

  const recipe = data && data.recipeByNamespaceAndSlug;

  if (!data || loading || !recipe || !recipe.latestRevision) {
    return null;
  }

  return (
    <div css={{ borderTop: '7px solid #DF9E19', padding: '1rem' }}>
      <div css={{ display: 'flex' }}>
        <div
          css={{
            maxWidth: '260px',
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
            maxWidth: '260px',
            width: '30%',
            paddingRight: '1rem',
            boxSizing: 'border-box',
          }}
        >
          <ul>
            {recipe.latestRevision.shakeAndVapable ? (
              <li>Shake and Vapable</li>
            ) : null}
            <li>
              {recipe.latestRevision.suggestedSteepHours}hrs suggested steep
            </li>
            {recipe.latestRevision.suggestedVg ? (
              <li>{recipe.latestRevision.suggestedVg * 100}% VG suggested</li>
            ) : null}
          </ul>
        </aside>
        <div css={{ flex: '1 1 0' }}>
          <input
            type="checkbox"
            id="showIngredientNotes"
            checked={showNotes}
            onChange={(e) => setShowNotes(e.target.checked)}
          />{' '}
          <label htmlFor="showIngredientNotes">Show notes</label>
          <table>
            <tbody>
              {recipe.latestRevision!.ingredients!.map((ingredientUse) => (
                <React.Fragment key={ingredientUse!.id}>
                  <tr>
                    <td>{ingredientUse!.ingredient!.vendor!.shortName}</td>
                    <td>{ingredientUse!.ingredient!.vendor!.shortName}</td>
                    <td>{ingredientUse!.ingredient!.name}</td>
                    <td>{ingredientUse!.percentage! / 1000}%</td>
                  </tr>
                  {!showNotes ? null : (
                    <tr>
                      <td colSpan={4}>{ingredientUse!.note}</td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>
                  Total flavoring:{' '}
                  {recipe.latestRevision!.ingredients!.reduce(
                    (total, ingredientUse) =>
                      total + ingredientUse!.percentage!,
                    0,
                  ) / 1000}
                  %
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>{' '}
    </div>
  );
};
