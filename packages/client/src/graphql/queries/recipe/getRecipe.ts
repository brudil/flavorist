import gql from 'graphql-tag';

export const getRecipe = gql`
  query getRecipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      id
      name
      latestRevision {
        ingredients {
          ingredient {
            name
            vendor {
              shortName
            }
          }
          percentage
        }
      }
      namespace {
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
