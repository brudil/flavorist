import gql from 'graphql-tag';

export const getIngredient = gql`
  query getIngredient($id: ID!) {
    ingredient(id: $id) {
      id
      name

      vendor {
        id
        shortName
      }
    }
  }
`;
