import gql from 'graphql-tag';
import { pageInfo } from '../core/pageInfo';

export const getIngredients = gql`
  query getIngredients($cursor: String) {
    allIngredients(cursor: $cursor) {
      pageInfo {
        ...pageInfo
      }
      edges {
        cursor
        node {
          id
          name
          slug
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
