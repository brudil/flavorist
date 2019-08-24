import gql from 'graphql-tag';

export const getViewerRecipes = gql`
  query getViewerRecipes {
    viewer {
      id

      recipes {
        id
        name
        slug
        namespace {
          name
        }
        latestRevision {
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
