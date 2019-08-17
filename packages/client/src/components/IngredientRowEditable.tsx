import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetIngredientQuery } from '../generated/graphql';
import { getIngredient } from '../graphql/queries/ingredients/getIngredient';

export const IngredientRowEditable: React.FC<{
  id: string;
  percentage: number;
  onRemove: () => void;
  onUpdate: (p: { percentage: number }) => void;
}> = ({ id, percentage, onRemove, onUpdate }) => {
  const { data, loading } = useQuery<GetIngredientQuery>(getIngredient, {
    variables: { id },
  });

  if (!data || loading) {
    return <li />;
  }

  return (
    <tr>
      <td>
        <button onClick={onRemove}>x</button>
      </td>
      <td>{data.ingredient.vendor && data.ingredient.vendor.shortName}</td>
      <td>{data.ingredient.name}</td>
      <td>
        <input
          type="number"
          step={0.25}
          value={percentage}
          onChange={(e) => onUpdate({ percentage: parseFloat(e.target.value) })}
        />
        %
      </td>
    </tr>
  );
};
