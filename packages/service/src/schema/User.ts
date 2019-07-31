import { gql } from 'apollo-server-core';

export const UserSchema = gql`
  type User implements DatedEntity {
    id: ID!
    name: String
    recipes: [Recipe]
    inventory: [InventoryItem]

    createdAt: String
    updatedAt: String
  }

  type Viewer implements DatedEntity {
    id: ID!
    name: String
    recipes: [Recipe]
    inventory: [InventoryItem]

    createdAt: String
    updatedAt: String
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
    viewer: Viewer
  }
`;
