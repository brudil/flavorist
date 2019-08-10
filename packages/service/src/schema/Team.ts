import { gql } from 'apollo-server-core';

export const UserSchema = gql`
  type Team implements Node {
    id: ID!
    name: String
    namespace: Namespace
  }
`;
