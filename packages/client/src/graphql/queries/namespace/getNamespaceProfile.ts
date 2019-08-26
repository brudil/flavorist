import gql from 'graphql-tag';

export const getNamespaceProfile = gql`
  query getNamespaceProfile($name: String!) {
    namespace(name: $name) {
      id
      name
      owner {
        ... on User {
          id
          name
        }
        ... on Team {
          id
          name
        }
      }
    }
  }
`;
