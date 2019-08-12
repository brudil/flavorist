import gql from 'graphql-tag';

export const performJoin = gql`
  mutation performJoin(
    $emailAddress: String!
    $username: String!
    $password: String!
  ) {
    createUser(
      emailAddress: $emailAddress
      username: $username
      password: $password
    ) {
      viewer {
        id
        name
        namespace {
          id
          name
          owner {
            ... on User {
              id
            }
          }
        }
      }
    }
  }
`;
