import { Reducer, useReducer } from 'react';
import produce from 'immer';

interface State {
  ingredients: string[];
  liveMixing: boolean;
  uses: {
    [id: string]: {
      percentage: number;
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
  | AddIngredientAction
  | UpdateIngredientAction
  | DeleteIngredientAction;

const reducer: Reducer<State, Actions> = (prevState, action) => {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return produce(prevState, (draft) => {
        draft.ingredients.push(action.payload.ingredientId);
        draft.uses[action.payload.ingredientId] = { percentage: 0.75 };
      });
    case 'UPDATE_INGREDIENT':
      return produce(prevState, (draft) => {
        draft.uses[action.payload.ingredientId] = {
          percentage: action.payload.percentage,
        };
      });
    case 'DELETE_INGREDIENT':
      return produce(prevState, (draft) => {
        const idToRemove = action.payload.ingredientId;
        const index = draft.ingredients.indexOf(idToRemove);
        draft.ingredients.splice(index, 1);

        delete draft.uses[idToRemove];
      });
  }

  return prevState;
};

export const useRecipeMixer = () => {
  return useReducer(reducer, {
    ingredients: [],
    uses: {},
    liveMixing: false,
    batch: {},
  });
};
