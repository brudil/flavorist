import gql from 'graphql-tag';

export const performLogout = gql`
  mutation performLogout {
    logout {
      success
    }
  }
`;
