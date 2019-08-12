import gql from 'graphql-tag';

export const performLogin = gql`
  mutation performLogin($emailAddress: String!, $password: String!) {
    authenticateUser(emailAddress: $emailAddress, password: $password) {
      viewer {
        namespace {
          name
        }
      }
    }
  }
`;
