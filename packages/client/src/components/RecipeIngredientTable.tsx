import React, { useState } from 'react';
import { RecipeRevision } from '../generated/graphql';
import { css } from '@emotion/core';
import { type, TypeSize } from '../style/type';

const contentCell = css({
  padding: '0.5rem',
  fontWeight: 600,
  ...type(TypeSize.Pica),
});

export const RecipeIngredientTable: React.FC<{
  recipeRevision: RecipeRevision;
}> = ({ recipeRevision }) => {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <React.Fragment>
      <input
        type="checkbox"
        id="showIngredientNotes"
        checked={showNotes}
        onChange={(e) => setShowNotes(e.target.checked)}
      />{' '}
      <label htmlFor="showIngredientNotes">Show notes</label>
      <table css={{ borderCollapse: 'collapse' }}>
        <tbody>
          {recipeRevision.ingredients!.map((ingredientUse) => (
            <React.Fragment key={ingredientUse!.id}>
              <tr
                css={{
                  backgroundColor: '#fafafa',
                  marginBottom: '0.3rem',
                  borderBottom: '3px #fff solid',
                }}
              >
                <td css={{ width: 3, background: '#dd0000' }}></td>
                <td css={contentCell}>
                  {ingredientUse!.ingredient!.vendor!.shortName}
                </td>
                <td css={contentCell}>{ingredientUse!.ingredient!.name}</td>
                <td css={[contentCell, { textAlign: 'right' }]}>
                  {ingredientUse!.percentage! / 1000}%
                </td>
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
            <td />
            <td />
            <td />
            <td css={{ textAlign: 'right' }}>
              {recipeRevision.ingredients!.reduce(
                (total, ingredientUse) => total + ingredientUse!.percentage!,
                0,
              ) / 1000}
              %
            </td>
          </tr>
        </tfoot>
      </table>
    </React.Fragment>
  );
};
