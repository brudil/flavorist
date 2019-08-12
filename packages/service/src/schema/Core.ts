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

  type MutationResponse {
    success: Boolean!
  }

  interface Node {
    id: ID!
  }

  interface Connection {
    pageInfo: PageInfo!
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
  }
`;
