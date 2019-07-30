import { gql } from 'apollo-server-core';

export const UserSchema = gql`
  type User {
    id: ID!
    name: String
    recipes: [Recipe]
    inventory: [InventoryItem]
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type UserAuthorisation implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
    token: String
  }

  type UserCreated implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    token: String
    user: User
  }

  extend type Mutation {
    createUser(emailAddress: String!, password: String!): UserCreated
    authenticateUser(
      emailAddress: String!
      password: String!
    ): UserAuthorisation
    requestPasswordReset(emailAddress: String!): MutationResponse
  }

  extend type Query {
    user(userId: ID!): User
  }
`;
