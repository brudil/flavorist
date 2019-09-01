import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetIngredientQuery } from '../generated/graphql';
import { getIngredient } from '../graphql/queries/ingredients/getIngredient';
import {
  IngredientInventoryStatus,
  IngredientTableCell,
  IngredientTableIndicator,
  IngredientTableRow,
} from './IngredientTable';

export const IngredientRowEditable: React.FC<{
  id: string;
  batch: { targetUl: number };
  percentage: number;
  mixed: number | null;
  onRemove: () => void;
  onRecipeUpdate: (p: { percentage: number }) => void;
  onBatchUpdate: (p: { micrograms: number }) => void;
}> = ({
  id,
  percentage,
  mixed,
  onRemove,
  onRecipeUpdate,
  onBatchUpdate,
  batch,
}) => {
  const { data, loading } = useQuery<GetIngredientQuery>(getIngredient, {
    variables: { id },
  });

  if (!data || !data.ingredient || loading) {
    return <li />;
  }

  const targetGrams = (batch.targetUl * (percentage / 100)) / 1000;
  const currentDifference =
    Math.round(((mixed || 0) - targetGrams) * 1000) / 1000;

  return (
    <IngredientTableRow>
      <IngredientTableIndicator
        ingredientStatus={IngredientInventoryStatus.Available}
      />
      <IngredientTableCell>
        <button onClick={onRemove}>x</button>
      </IngredientTableCell>
      <IngredientTableCell>
        {data.ingredient.vendor && data.ingredient.vendor.shortName}
      </IngredientTableCell>
      <IngredientTableCell>{data.ingredient.name}</IngredientTableCell>
      <IngredientTableCell>
        <input
          type="number"
          step={0.25}
          css={{ width: 70 }}
          value={percentage}
          onChange={(e) =>
            onRecipeUpdate({ percentage: parseFloat(e.target.value) })
          }
        />
      </IngredientTableCell>
      {mixed !== null ? (
        <React.Fragment>
          <IngredientTableCell css={{ borderLeft: '1px solid grey' }}>
            {targetGrams.toFixed(2)}
          </IngredientTableCell>
          <IngredientTableCell>
            <input
              css={{ width: 70 }}
              type="number"
              step={0.01}
              value={mixed}
              onChange={(e) =>
                onBatchUpdate({ micrograms: parseFloat(e.target.value) })
              }
            />
          </IngredientTableCell>
          <IngredientTableCell>
            {currentDifference > 0
              ? `+${currentDifference.toFixed(2)}`
              : currentDifference.toFixed(2)}
            g
          </IngredientTableCell>
        </React.Fragment>
      ) : null}
    </IngredientTableRow>
  );
};
