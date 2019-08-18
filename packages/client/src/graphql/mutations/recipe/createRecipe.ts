import gql from 'graphql-tag';

export const createRecipe = gql`
  mutation createRecipe($input: CreateRecipeInput!) {
    createRecipe(recipe: $input) {
      success
    }
  }
`;
