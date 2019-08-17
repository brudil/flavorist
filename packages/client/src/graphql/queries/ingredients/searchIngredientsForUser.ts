import gql from 'graphql-tag';
import { pageInfo } from '../core/pageInfo';

export const searchIngredientsForUser = gql`
  query searchIngredientsForUser($query: String!) {
    searchIngredients(query: $query) {
      pageInfo {
        ...pageInfo
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

  ${pageInfo}
`;
