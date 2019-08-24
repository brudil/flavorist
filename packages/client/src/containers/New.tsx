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
import { Field, Formik } from 'formik';

const convertStateToInput = (
  formState: {
    shakeAndVapable: boolean;
    name: string;
    suggestedVg: number;
    suggestedSteepHours: number;
  },
  state: RecipeMixerState,
): CreateRecipeInput => {
  return {
    ...formState,
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
      <Formik
        onSubmit={(values) =>
          perform({ variables: { input: convertStateToInput(values, state) } })
        }
        initialValues={{
          name: '',
          shakeAndVapable: false,
          suggestedVg: 0.7,
          suggestedSteepHours: 24,
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Field type="text" name="name" placeholder="Recipe Name" />
            <Field type="checkbox" name="shakeAndVapable" />
            <Field type="number" step={0.05} name="suggestedVg" />
            <Field type="number" step={12} name="suggestedSteepHours" />
            <button type="submit">Create Recipe</button>
          </form>
        )}
      </Formik>
    </div>
  );
};
