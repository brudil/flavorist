import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { IngredientSelector } from '../components/IngredientSelector';
import { useRecipeMixer } from '../hooks/recipeBatcher';
import { IngredientRowEditable } from '../components/IngredientRowEditable';

export const New: React.FC<RouteComponentProps> = () => {
  const [state, dispatch] = useRecipeMixer();

  return (
    <div>
      <h1>New</h1>

      <div>
        <IngredientSelector
          onAdd={({ id }) =>
            dispatch({ type: 'ADD_INGREDIENT', payload: { ingredientId: id } })
          }
        />
      </div>

      <table>
        <tbody>
          {state.ingredients.map((id) => (
            <IngredientRowEditable
              key={id}
              id={id}
              percentage={state.uses[id].percentage}
              onRemove={() =>
                dispatch({
                  type: 'DELETE_INGREDIENT',
                  payload: { ingredientId: id },
                })
              }
              onUpdate={({ percentage }) =>
                dispatch({
                  type: 'UPDATE_INGREDIENT',
                  payload: { ingredientId: id, percentage },
                })
              }
            />
          ))}
        </tbody>
      </table>

      <button>Create Recipe</button>
    </div>
  );
};
