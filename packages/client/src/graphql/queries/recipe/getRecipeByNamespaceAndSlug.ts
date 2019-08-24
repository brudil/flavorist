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
