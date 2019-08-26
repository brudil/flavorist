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
          id
          name
        }
        latestRevision {
          id
          ingredients {
            id
            percentage
            ingredient {
              id
              name
            }
          }
        }
      }
    }
  }
`;
