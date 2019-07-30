import { gql } from 'apollo-server-core';

export const CoreSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }

  interface DatedEntity {
    createdAt: String
    updatedAt: String
  }
`;
