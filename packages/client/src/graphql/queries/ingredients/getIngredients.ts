import gql from 'graphql-tag';

export const getIngredients = gql`
  query getIngredients($cursor: String) {
    allIngredients(cursor: $cursor) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          name

          vendor {
            id
            shortName
          }
        }
      }
    }
  }
`;
