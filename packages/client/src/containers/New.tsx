import React, { useState } from 'react';
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
import { ViewContainer } from '../components/ViewContainer';
import {
  IngredientInventoryStatus,
  IngredientTable,
  IngredientTableCell,
  IngredientTableIndicator,
} from '../components/IngredientTable';
import VisuallyHidden from '@reach/visually-hidden';
import { Modal } from '../components/Modal';

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

  const [showCreationModal, setCreationModal] = useState(false);

  const isMixing =
    state.mode === CreationMode.LIVE || state.mode === CreationMode.BATCH;

  return (
    <ViewContainer>
      <Helmet title="New" />
      <h1>New</h1>
      <div css={{ display: 'flex' }}>
        <div css={{ flex: 'auto' }}>
          <div>
            <IngredientSelector
              onAdd={({ id }) =>
                dispatch({
                  type: 'ADD_INGREDIENT',
                  payload: { ingredientId: id },
                })
              }
            />
          </div>

          <IngredientTable>
            <thead>
              <IngredientTableIndicator
                ingredientStatus={IngredientInventoryStatus.Header}
              />
              <IngredientTableCell></IngredientTableCell>
              <IngredientTableCell>vendor</IngredientTableCell>
              <IngredientTableCell>flavor</IngredientTableCell>
              <IngredientTableCell>%</IngredientTableCell>
              {isMixing ? (
                <React.Fragment>
                  <IngredientTableCell>target</IngredientTableCell>
                  <IngredientTableCell>mixed</IngredientTableCell>
                  <IngredientTableCell>Δ</IngredientTableCell>
                </React.Fragment>
              ) : null}
            </thead>
            <tbody>
              {state.ingredients.map((id) => (
                <IngredientRowEditable
                  key={id}
                  id={id}
                  batch={state.batch}
                  percentage={state.recipeUses[id].percentage}
                  mixed={isMixing ? state.batchUses[id].micrograms || 0 : null}
                  onRemove={() =>
                    dispatch({
                      type: 'DELETE_INGREDIENT',
                      payload: { ingredientId: id },
                    })
                  }
                  onRecipeUpdate={({ percentage }) =>
                    dispatch({
                      type: 'UPDATE_RECIPE_INGREDIENT',
                      payload: { ingredientId: id, percentage },
                    })
                  }
                  onBatchUpdate={({ micrograms }) =>
                    dispatch({
                      type: 'UPDATE_BATCH_INGREDIENT',
                      payload: { ingredientId: id, micrograms },
                    })
                  }
                />
              ))}
            </tbody>
          </IngredientTable>

          <div>
            Flavoring:{' '}
            {Object.values(state.recipeUses).reduce(
              (val, use) => val + use.percentage,
              0,
            )}
            %
          </div>
        </div>

        <aside
          css={{
            width: 300,
            borderLeft: '1px solid #888',
            paddingLeft: '2rem',
          }}
        >
          Live mixing:{' '}
          <button onClick={() => dispatch({ type: 'TOGGLE_LIVE_MIXING' })}>
            {state.mode === CreationMode.LIVE ? 'On' : 'Off'}
          </button>
          {isMixing ? (
            <div>
              target:{' '}
              <input
                type="number"
                value={state.batch.targetUl / 1000}
                onChange={(event) =>
                  dispatch({
                    type: 'SET_BATCH_TARGET',
                    payload: {
                      target: parseFloat(event.target.value),
                    },
                  })
                }
              />
              ml
            </div>
          ) : null}
        </aside>
      </div>

      <button onClick={() => setCreationModal(true)}>Next</button>

      <Modal
        isOpen={showCreationModal}
        onDismiss={() => setCreationModal(false)}
      >
        <button
          className="close-button"
          onClick={() => setCreationModal(false)}
        >
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>

        <Formik
          onSubmit={(values) => {
            perform({
              variables: { input: convertStateToInput(values, state) },
            }).then((result) => console.log(result));
          }}
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
      </Modal>
    </ViewContainer>
  );
};
