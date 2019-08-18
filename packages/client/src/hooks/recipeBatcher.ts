import { Dispatch, Reducer, useReducer } from 'react';
import produce from 'immer';

export enum CreationMode {
  RECIPE,
  LIVE,
  BATCH,
}

export interface RecipeMixerState {
  ingredients: string[];
  mode: CreationMode;
  recipeUses: {
    [id: string]: {
      percentage: number;
    };
  };
  batchUses: {
    [id: string]: {
      micrograms: number;
    };
  };
  batch: null | {};
}

interface AddIngredientAction {
  type: 'ADD_INGREDIENT';
  payload: {
    ingredientId: string;
  };
}

interface ToggleLiveMixingAction {
  type: 'TOGGLE_LIVE_MIXING';
}

interface UpdateIngredientAction {
  type: 'UPDATE_INGREDIENT';
  payload: {
    ingredientId: string;
    percentage: number;
  };
}

interface DeleteIngredientAction {
  type: 'DELETE_INGREDIENT';
  payload: {
    ingredientId: string;
  };
}

type Actions =
  | ToggleLiveMixingAction
  | AddIngredientAction
  | UpdateIngredientAction
  | DeleteIngredientAction;

const reducer: Reducer<RecipeMixerState, Actions> = (prevState, action) => {
  switch (action.type) {
    case 'TOGGLE_LIVE_MIXING':
      return produce(prevState, (draft) => {
        draft.mode =
          draft.mode === CreationMode.RECIPE
            ? CreationMode.LIVE
            : CreationMode.RECIPE;
      });
    case 'ADD_INGREDIENT':
      return produce(prevState, (draft) => {
        draft.ingredients.push(action.payload.ingredientId);
        draft.recipeUses[action.payload.ingredientId] = { percentage: 0.75 };
      });
    case 'UPDATE_INGREDIENT':
      return produce(prevState, (draft) => {
        draft.recipeUses[action.payload.ingredientId] = {
          percentage: action.payload.percentage,
        };
      });
    case 'DELETE_INGREDIENT':
      return produce(prevState, (draft) => {
        const idToRemove = action.payload.ingredientId;
        const index = draft.ingredients.indexOf(idToRemove);
        draft.ingredients.splice(index, 1);

        delete draft.recipeUses[idToRemove];
        delete draft.batchUses[idToRemove];
      });
  }

  return prevState;
};

export const useRecipeMixer = (): [RecipeMixerState, Dispatch<Actions>] => {
  const [state, dispatch] = useReducer(reducer, {
    ingredients: [],
    recipeUses: {},
    batchUses: {},
    mode: CreationMode.RECIPE,
    batch: {},
  });

  return [state, dispatch];
};
