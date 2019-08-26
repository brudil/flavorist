import gql from 'graphql-tag';

export const getRecipe = gql`
  query getRecipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      id
      name
      latestRevision {
        id
        ingredients {
          id
          note
          ingredient {
            id
            name
            vendor {
              id
              shortName
            }
          }
          percentage
        }
      }
      namespace {
        id
        owner {
          ... on User {
            name
          }
          ... on Team {
            name
          }
        }
      }
    }
  }
`;
