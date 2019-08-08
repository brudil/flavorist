import gql from 'graphql-tag';

export const getUserProfile = gql`
  query getUserProfile($username: String!) {
    user(username: $username) {
      id
      username
    }
  }
`;
