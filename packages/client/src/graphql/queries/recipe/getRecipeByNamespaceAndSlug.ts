import gql from 'graphql-tag';

export const getRecipeByNamespaceAndSlug = gql`
  query getRecipeByNamespaceAndSlug(
    $namespaceName: String!
    $recipeSlug: String!
  ) {
    recipeByNamespaceAndSlug(
      namespaceName: $namespaceName
      recipeSlug: $recipeSlug
    ) {
      id
      name
      latestRevision {
        id
        description
        shakeAndVapable
        suggestedVg
        suggestedSteepHours
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
        name
        owner {
          ... on User {
            id
            name
          }
          ... on Team {
            id
            name
          }
        }
      }
    }
  }
`;
