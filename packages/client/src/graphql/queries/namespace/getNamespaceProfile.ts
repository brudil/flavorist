import gql from 'graphql-tag';

export const getNamespaceProfile = gql`
  query getNamespaceProfile($name: String!) {
    namespace(name: $name) {
      id
      name
      owner {
        id
        ... on User {
          name
        }
        ... on Team {
          name
        }
      }
    }
  }
`;
