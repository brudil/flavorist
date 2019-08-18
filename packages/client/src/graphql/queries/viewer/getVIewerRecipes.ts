import gql from 'graphql-tag';

export const getViewerRecipes = gql`
  query getViewerRecipes {
    viewer {
      id

      recipes {
        id
        namespace {
          name
        }
        latestRevision {
          name
          ingredients {
            percentage
            ingredient {
              name
            }
          }
        }
      }
    }
  }
`;
