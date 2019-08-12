import gql from 'graphql-tag';

export const pageInfo = gql`
  fragment pageInfo on PageInfo {
    startCursor
    endCursor
    hasNextPage
    hasPreviousPage
  }
`;
