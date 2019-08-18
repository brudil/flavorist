import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { IngredientSelector } from '../components/IngredientSelector';
import {
  CreationMode,
  RecipeMixerState,
  useRecipeMixer,
} from '../hooks/recipeBatcher';
import { IngredientRowEditable } from '../components/IngredientRowEditable';
import { Helmet } from 'react-helmet-async';
import { useMutation } from '@apollo/react-hooks';
import { createRecipe } from '../graphql/mutations/recipe/createRecipe';
import {
  CreateRecipeInput,
  CreateRecipeMutation,
  CreateRecipeMutationVariables,
} from '../generated/graphql';

const convertStateToInput = (state: RecipeMixerState): CreateRecipeInput => {
  return {
    name: 'example recipe',
    ingredients: state.ingredients.map((id) => ({
      ingredientId: id,
      percentage: state.recipeUses[id].percentage * 1000,
    })),
  };
};

export const New: React.FC<RouteComponentProps> = () => {
  const [state, dispatch] = useRecipeMixer();

  const [perform] = useMutation<
    CreateRecipeMutation,
    CreateRecipeMutationVariables
  >(createRecipe);

  return (
    <div>
      <Helmet title="New" />
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
              percentage={state.recipeUses[id].percentage}
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

      <div>
        Flavoring:{' '}
        {Object.values(state.recipeUses).reduce(
          (val, use) => val + use.percentage,
          0,
        )}
        %
      </div>

      <aside>
        Live mixing:{' '}
        <button onClick={() => dispatch({ type: 'TOGGLE_LIVE_MIXING' })}>
          {state.mode === CreationMode.LIVE ? 'On' : 'Off'}
        </button>
      </aside>

      <button
        onClick={() =>
          perform({ variables: { input: convertStateToInput(state) } })
        }
      >
        Create Recipe
      </button>
    </div>
  );
};
